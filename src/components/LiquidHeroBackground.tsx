import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

class TouchTexture {
    size: number;
    width: number;
    height: number;
    maxAge: number;
    radius: number;
    speed: number;
    trail: any[];
    last: { x: number; y: number } | null;
    canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;
    texture: THREE.Texture | null = null;

    constructor() {
        this.size = 64;
        this.width = this.height = this.size;
        this.maxAge = 64;
        this.radius = 0.25 * this.size;
        this.speed = 1 / this.maxAge;
        this.trail = [];
        this.last = null;
        this.initTexture();
    }

    initTexture() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        if (this.ctx) {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.texture = new THREE.Texture(this.canvas);
    }

    update() {
        this.clear();
        const speed = this.speed;
        for (let i = this.trail.length - 1; i >= 0; i--) {
            const point = this.trail[i];
            const f = point.force * speed * (1 - point.age / this.maxAge);
            point.x += point.vx * f;
            point.y += point.vy * f;
            point.age++;
            if (point.age > this.maxAge) {
                this.trail.splice(i, 1);
            } else {
                this.drawPoint(point);
            }
        }
        if (this.texture) this.texture.needsUpdate = true;
    }

    clear() {
        if (this.ctx) {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvas!.width, this.canvas!.height);
        }
    }

    addTouch(point: { x: number; y: number }) {
        let force = 0;
        let vx = 0;
        let vy = 0;
        const last = this.last;
        if (last) {
            const dx = point.x - last.x;
            const dy = point.y - last.y;
            if (dx === 0 && dy === 0) return;
            const dd = dx * dx + dy * dy;
            const d = Math.sqrt(dd);
            vx = dx / d;
            vy = dy / d;
            force = Math.min(dd * 20000, 2.0);
        }
        this.last = { x: point.x, y: point.y };
        this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
    }

    drawPoint(point: any) {
        if (!this.ctx) return;
        const pos = {
            x: point.x * this.width,
            y: (1 - point.y) * this.height
        };

        let intensity = 1;
        if (point.age < this.maxAge * 0.3) {
            intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
        } else {
            const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
            intensity = -t * (t - 2);
        }
        intensity *= point.force;

        const radius = this.radius;
        const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255
            }, ${intensity * 255}`;
        const offset = this.size * 5;
        this.ctx.shadowOffsetX = offset;
        this.ctx.shadowOffsetY = offset;
        this.ctx.shadowBlur = radius * 1;
        this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255,0,0,1)";
        this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

interface LiquidHeroBackgroundProps {
    imageUrl: string;
}

const LiquidHeroBackground: React.FC<LiquidHeroBackgroundProps> = ({ imageUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 50;

        const getViewSize = () => {
            const fovInRadians = (camera.fov * Math.PI) / 180;
            const h = Math.abs(camera.position.z * Math.tan(fovInRadians / 2) * 2);
            return { width: h * camera.aspect, height: h };
        };

        const viewSize = getViewSize();

        const touchTexture = new TouchTexture();

        // Shader Material
        const uniforms = {
            uTime: { value: 0 },
            uTouchTexture: { value: touchTexture.texture },
            uResolution: { value: new THREE.Vector2(width, height) },
        };

        const geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height);
        const material = new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform sampler2D uTouchTexture;
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          // Sample touch texture for distortion
          vec4 touch = texture2D(uTouchTexture, vUv);
          
          // Distortion strength - increased for "glass drop" feel
          float vx = -(touch.r * 2.0 - 1.0);
          float vy = -(touch.g * 2.0 - 1.0);
          float intensity = touch.b;
          
          // Orange hue color (F15A22 style from existing theme)
          vec3 orangeColor = vec3(0.945, 0.353, 0.133);
          
          // Base glass color (translucent white/blue)
          vec3 glassColor = vec3(1.0, 1.0, 1.0);
          float alpha = 0.02; // Slightly lower base opacity
          
          // Enhance alpha significantly in distorted areas
          alpha += intensity * 0.4;
          
          // Add much stronger spectral/shimmer effect with orange hue
          vec3 shimmer = vec3(1.0, 0.6 + 0.4 * sin(vx * 10.0), 0.2 + 0.2 * cos(vy * 10.0));
          shimmer = mix(shimmer, orangeColor, 0.5);
          glassColor = mix(glassColor, shimmer, intensity * 0.7);

          // Stronger specular highlights with orange tint
          float highlight = pow(intensity, 2.0) * 0.5;
          highlight += sin(vUv.x * 20.0 + vUv.y * 10.0 + uTime * 2.0) * 0.2 * intensity;
          glassColor += highlight * orangeColor;

          // Add a "lens" effect (magnification/distortion simulation) with orange tint
          float lens = smoothstep(0.0, 1.0, intensity) * 0.4;
          glassColor += lens * orangeColor;

          gl_FragColor = vec4(glassColor, clamp(alpha, 0.0, 0.8));
        }
      `,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Handle interaction
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1 - (e.clientY - rect.top) / rect.height;
            touchTexture.addTouch({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            const delta = clock.getDelta();
            uniforms.uTime.value += delta;
            touchTexture.update();
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Resize Handler
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            const newViewSize = getViewSize();
            mesh.geometry.dispose();
            mesh.geometry = new THREE.PlaneGeometry(newViewSize.width, newViewSize.height);
            uniforms.uResolution.value.set(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [imageUrl]);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default LiquidHeroBackground;
