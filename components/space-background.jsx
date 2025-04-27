"use client";

import { useEffect, useRef, useState } from "react";

export const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const astronautRef = useRef(null);
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  useEffect(() => {
    if (!isClient) return; // Ensure this runs only on the client side

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function setCanvasSize() {
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    }
    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);

    // Load astronaut image only on the client side
    const astronaut = new Image();
    astronaut.crossOrigin = "anonymous";
    astronaut.src = "/logo.png"; // Ensure this image is in your public folder

    const isMobile = window.innerWidth < 768;

    // Separate speed factors
    const starSpeedFactor = isMobile ? 0.1 : 0.5;
    const astronautSpeedFactor = isMobile ? 1.5 : 3;

    const starCount = isMobile ? 50 : 100;
    const astronautSize = isMobile ? 70 : 70;

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: (Math.random() * 0.5 + 0.1) * starSpeedFactor, // Stars use starSpeedFactor
    }));

    let shootingStar = null;

    const astronauts = Array.from({ length: 10 }, () => ({
      x: canvas.width / 2, // Start at center
      y: canvas.height / 2, // Start at center
      speedX: (Math.random() * 5 - 2) * astronautSpeedFactor, // Astronauts use astronautSpeedFactor
      speedY: (Math.random() * 5 - 2) * astronautSpeedFactor,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() * 0.005 - 0.0025) * astronautSpeedFactor,
    }));

    function createShootingStar() {
      shootingStar = {
        x: Math.random() * canvas.width,
        y: (Math.random() * canvas.height) / 2,
        length: 100,
        speed: 30,
        visible: true,
      };
      setTimeout(createShootingStar, Math.random() * 5000 + 2000);
    }

    function drawStars() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawShootingStar() {
      if (shootingStar && shootingStar.visible) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.length,
          shootingStar.y + shootingStar.length / 2
        );
        ctx.stroke();
      }
    }

    function drawAstronauts() {
      astronauts.forEach(({ x, y, angle }) => {
        ctx.save();
        ctx.translate(x + astronautSize / 2, y + astronautSize / 2);
        ctx.rotate(angle);
        ctx.drawImage(
          astronaut,
          -astronautSize / 2,
          -astronautSize / 2,
          astronautSize,
          astronautSize
        );
        ctx.restore();
      });
    }

    function update() {
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });

      if (shootingStar) {
        shootingStar.x -= shootingStar.speed;
        shootingStar.y += shootingStar.speed / 2;
        if (shootingStar.x < 0 || shootingStar.y > canvas.height) {
          shootingStar.visible = false;
        }
      }

      astronauts.forEach((astronaut) => {
        astronaut.x += astronaut.speedX;
        astronaut.y += astronaut.speedY;

        function changeRotationSpeed() {
          const rotationSpeeds = [0.1, 0.005, 0.05, 0.01].map(
            (s) => s * astronautSpeedFactor
          );
          astronaut.rotationSpeed =
            rotationSpeeds[Math.floor(Math.random() * rotationSpeeds.length)];
        }

        if (astronaut.x < 0 || astronaut.x > canvas.width - astronautSize) {
          astronaut.speedX *= -1;
          changeRotationSpeed();
        }
        if (astronaut.y < 0 || astronaut.y > canvas.height - astronautSize) {
          astronaut.speedY *= -1;
          changeRotationSpeed();
        }

        astronaut.angle += astronaut.rotationSpeed;
      });
    }

    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStars();
      drawShootingStar();
      drawAstronauts();
      update();
      animationFrameId = requestAnimationFrame(animate);
    }

    astronaut.onload = () => {
      createShootingStar();
      animate();
    };

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]); // Depend on isClient to ensure it runs on the client side

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
