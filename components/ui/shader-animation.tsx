"use client"

import { useEffect, useRef } from "react"

export function ShaderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let gl: WebGLRenderingContext | null = null
  let program: WebGLProgram | null = null
  let positionAttributeLocation: number | null = null
  let timeUniformLocation: WebGLUniformLocation | null = null
  let resolutionUniformLocation: WebGLUniformLocation | null = null
  let positionBuffer: WebGLBuffer | null = null

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    gl = canvas.getContext("webgl")
    if (!gl) return

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `

    // Fragment shader source - Mario-inspired pixel art style
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        
        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          
          float d = length(uv) * exp(-length(uv0));
          
          vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);
          
          d = sin(d * 8.0 + u_time) / 8.0;
          d = abs(d);
          
          d = pow(0.01 / d, 1.2);
          
          finalColor += col * d;
        }
        
        // Add Mario-style pixelation
        vec2 pixelUv = floor(gl_FragCoord.xy / 8.0) * 8.0 / u_resolution.xy;
        finalColor *= 0.8 + 0.2 * sin(pixelUv.x * 50.0) * sin(pixelUv.y * 50.0);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    function createShader(type: number, source: string) {
      const shader = gl?.createShader(type)
      if (!shader) return null

      gl?.shaderSource(shader, source)
      gl?.compileShader(shader)

      if (!gl?.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl?.getShaderInfoLog(shader))
        gl?.deleteShader(shader)
        return null
      }

      return shader
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) return

    program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program))
      return
    }

    positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    timeUniformLocation = gl.getUniformLocation(program, "u_time")
    resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")

    positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    function resizeCanvas() {
      if (!canvas) return
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    function render(time: number) {
      if (
        !canvas ||
        !gl ||
        !program ||
        !positionAttributeLocation ||
        !timeUniformLocation ||
        !resolutionUniformLocation ||
        !positionBuffer
      )
        return

      resizeCanvas()

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(timeUniformLocation, time * 0.001)
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      requestAnimationFrame(render)
    }

    resizeCanvas()
    requestAnimationFrame(render)

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)" }}
    />
  )
}
