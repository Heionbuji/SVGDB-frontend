import React, { useEffect } from 'react';
import * as THREE from 'three';

const Test = () => {
  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
    const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 2000);
    const loader = new THREE.TextureLoader();
    const alphaMap = loader.load('http://localhost:3002/textures/1138410110');
    // alphaMap.format = THREE.RGBFormat;
    const texture = loader.load('http://localhost:3002/textures/1138410100');
    const money = loader.load('http://localhost:3002/textures/tx_foil_flower_strong');
    const distortion = loader.load('http://localhost:3002/textures/tx_shd_distortion');
    const geometry = new THREE.PlaneGeometry();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // const geometry = new THREE.BoxGeometry(1, 1, 1);

    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );
    const vertex = `uniform float time;
    uniform vec2 resolution;
    uniform vec4 _MainTex_ST;
    uniform float _DistortionRotate;
    uniform vec4 _DistortionTex_ST;
    uniform float _DistortionScrollAngle;
    uniform float _DistortionScrollU;
    uniform float _DistortionScrollV;
    uniform float _FlagDistortionMoveType;
    uniform float _Front1ScrollAngle;
    uniform vec4 _Front1Tex_ST;
    uniform float _Front1ScrollV;
    uniform float _Front1ScrollU;
    uniform float _Front1Rotate;
    uniform float _Front1FixedRotate;
    uniform float _FlagFront1MoveType;
    uniform float _Back1ScrollAngle;
    uniform vec4 _Back1Tex_ST;
    uniform float _Back1ScrollU;
    uniform float _Back1ScrollV;
    uniform float _Back1Rotate;
    uniform float _Back1FixedRotate;
    uniform float _FlagBack1MoveType;
    uniform float _Time;
    varying vec3 vs_TEXCOORD0;
    varying vec4 vs_TEXCOORD1;
    varying vec4 vs_TEXCOORD2;
    varying vec4 vs_TEXCOORD3;
    varying vec4 vs_TEXCOORD4;
    varying vec2 vUv;
    vec4 u_xlat0;
    vec4 u_xlat1;
    vec4 u_xlat2;
    bvec3 u_xlatb2;
    vec4 u_xlat3;
    bvec4 u_xlatb3;
    vec4 u_xlat4;
    bvec4 u_xlatb4;
    vec3 u_xlat5;
    vec3 u_xlat6;
    vec2 u_xlat8;
    vec2 u_xlat14;
    vec2 u_xlat15;
    void main() {
      vUv = uv;
      vec4 u_xlat0 = position.yyyy * modelMatrix;
      u_xlat0 = modelMatrix[0] * position.xxxx + u_xlat0;
      u_xlat0 = modelMatrix[2] * position.zzzz + u_xlat0;
      u_xlat0 = u_xlat0 + modelMatrix[3];
      mat4 pos = projectionMatrix * viewMatrix;
      u_xlat1 = u_xlat0.yyyy * pos[1];
      u_xlat1 = pos[0] * u_xlat0.xxxx + u_xlat1;
      u_xlat1 = pos[2] * u_xlat0.zzzz + u_xlat1;
      gl_Position = pos[3] * u_xlat0.wwww + u_xlat1;
      vs_TEXCOORD0.z = 0.0;
      u_xlat0.xy = vUv.xy * _MainTex_ST.xy + _MainTex_ST.zw;
      vs_TEXCOORD1.xy = u_xlat0.xy;
      u_xlat0.xy = u_xlat0.xy + (-vUv.xy);
      vs_TEXCOORD1 = vec4(0.0, 0.0, 0.0, 0.0);
      u_xlat14.x = (-_DistortionRotate) * _Time;
      u_xlat1.x = sin(u_xlat14.x);
      u_xlat2.x = cos(u_xlat14.x);
      u_xlat3.z = u_xlat1.x;
      u_xlat14.xy = vUv.xy * _DistortionTex_ST.xy + _DistortionTex_ST.zw;
      u_xlat4.xy = u_xlat0.xy * _DistortionTex_ST.xy + u_xlat14.xy;
      u_xlat14.xy = (-_DistortionTex_ST.xy) * vec2(0.5, 0.5) + u_xlat4.xy;
      u_xlat3.y = u_xlat2.x;
      u_xlat3.x = (-u_xlat1.x);
      u_xlat1.y = dot(u_xlat14.xy, u_xlat3.xy);
      u_xlat1.x = dot(u_xlat14.xy, u_xlat3.yz);
      u_xlat14.xy = _DistortionTex_ST.xy * vec2(0.5, 0.5) + u_xlat1.xy;
      u_xlat1.x = _DistortionScrollAngle * -0.0174532924;
      u_xlat2.x = cos(u_xlat1.x);
      u_xlat1.x = sin(u_xlat1.x);
      u_xlat3.z = u_xlat1.x;
      u_xlat8.xy = u_xlat4.xy / _DistortionTex_ST.xy;
      u_xlat3.y = u_xlat2.x;
      u_xlat3.x = (-u_xlat1.x);
      u_xlat2.y = dot(u_xlat8.xy, u_xlat3.xy);
      u_xlat2.x = dot(u_xlat8.xy, u_xlat3.yz);
      u_xlat1 = (-vec4(_DistortionScrollV, _DistortionScrollU, _DistortionScrollU, _DistortionScrollV)) * vec4(_Time, _Time, _Time, _Time);
      u_xlat1 = fract(u_xlat1);
      u_xlat15.xy = u_xlat2.xy * _DistortionTex_ST.xy + u_xlat1.zw;
      u_xlat4.zw = u_xlat1.xy;
      u_xlatb2.xyz = equal(vec4(_FlagDistortionMoveType), vec4(2.0, 1.0, 0.0, 0.0)).xyz;
      u_xlat1.xy = (u_xlatb2.z) ? u_xlat15.xy : u_xlat4.xy;
      u_xlat1.xy = (u_xlatb2.y) ? u_xlat14.xy : u_xlat1.xy;
      u_xlat1.z = float(0.0);
      u_xlat1.w = float(0.0);
      vs_TEXCOORD2 = (u_xlatb2.x) ? u_xlat4 : u_xlat1;
      u_xlat14.x = _Front1ScrollAngle * -0.0174532924;
      u_xlat1.x = sin(u_xlat14.x);
      u_xlat2.x = cos(u_xlat14.x);
      u_xlat3.z = u_xlat1.x;
      u_xlat3.y = u_xlat2.x;
      u_xlat3.x = (-u_xlat1.x);
      u_xlat14.xy = vUv.xy * _Front1Tex_ST.xy + _Front1Tex_ST.zw;
      u_xlat1.xy = u_xlat0.xy * _Front1Tex_ST.xy + u_xlat14.xy;
      u_xlat14.xy = u_xlat1.xy / _Front1Tex_ST.xy;
      u_xlat2.x = dot(u_xlat14.xy, u_xlat3.yz);
      u_xlat2.y = dot(u_xlat14.xy, u_xlat3.xy);
      u_xlat3.xyz = (-vec3(_Front1ScrollV, _Front1ScrollU, _Front1Rotate)) * vec3(_Time, _Time, _Time);
      u_xlat4 = fract(u_xlat3.xyyx);
      u_xlat5.x = cos(u_xlat3.z);
      u_xlat3.x = sin(u_xlat3.z);
      u_xlat14.xy = u_xlat2.xy * _Front1Tex_ST.xy + u_xlat4.zw;
      u_xlat1.zw = u_xlat4.xy;
      u_xlat2.x = sin(_Front1FixedRotate);
      u_xlat4.x = cos(_Front1FixedRotate);
      
      u_xlat6.z = u_xlat2.x;
      u_xlat6.y = u_xlat4.x;
      u_xlat6.x = (-u_xlat2.x);
      u_xlat2.y = dot(u_xlat1.xy, u_xlat6.xy);
      u_xlat2.x = dot(u_xlat1.xy, u_xlat6.yz);
      u_xlatb4 = equal(vec4(vec4(_FlagFront1MoveType, _FlagFront1MoveType, _FlagFront1MoveType, _FlagFront1MoveType)), vec4(2.0, 1.0, 0.0, -1.0));
      u_xlat2.xy = (u_xlatb4.w) ? u_xlat2.xy : u_xlat1.xy;
      u_xlat14.xy = (u_xlatb4.z) ? u_xlat14.xy : u_xlat2.xy;
      u_xlat2.xy = (-_Front1Tex_ST.xy) * vec2(0.5, 0.5) + u_xlat1.xy;
      u_xlat6.z = u_xlat3.x;
      u_xlat6.y = u_xlat5.x;
      u_xlat6.x = (-u_xlat3.x);
      u_xlat3.y = dot(u_xlat2.xy, u_xlat6.xy);
      u_xlat3.x = dot(u_xlat2.xy, u_xlat6.yz);
      u_xlat2.xy = _Front1Tex_ST.xy * vec2(0.5, 0.5) + u_xlat3.xy;
      u_xlat2.xy = (u_xlatb4.y) ? u_xlat2.xy : u_xlat14.xy;
      u_xlat2.z = float(0.0);
      u_xlat2.w = float(0.0);
      vs_TEXCOORD3 = (u_xlatb4.x) ? u_xlat1 : u_xlat2;
      u_xlat14.x = _Back1ScrollAngle * -0.0174532924;
      u_xlat1.x = sin(u_xlat14.x);
      u_xlat2.x = cos(u_xlat14.x);
      u_xlat3.z = u_xlat1.x;
      u_xlat14.xy = vUv.xy * _Back1Tex_ST.xy + _Back1Tex_ST.zw;
      u_xlat0.xy = u_xlat0.xy * _Back1Tex_ST.xy + u_xlat14.xy;
      u_xlat8.xy = u_xlat0.xy / _Back1Tex_ST.xy;
      u_xlat3.y = u_xlat2.x;
      u_xlat3.x = (-u_xlat1.x);
      u_xlat2.y = dot(u_xlat8.xy, u_xlat3.xy);
      u_xlat2.x = dot(u_xlat8.xy, u_xlat3.yz);
      u_xlat1.xyz = (-vec3(_Back1ScrollV, _Back1ScrollU, _Back1Rotate)) * vec3(_Time, _Time, _Time);
      u_xlat3 = fract(u_xlat1.xyyx);
      u_xlat4.x = cos(u_xlat1.z);
      u_xlat1.x = sin(u_xlat1.z);
      u_xlat8.xy = u_xlat2.xy * _Back1Tex_ST.xy + u_xlat3.zw;
      u_xlat0.zw = u_xlat3.xy;
      u_xlat2.x = sin(_Back1FixedRotate);
      u_xlat3.x = cos(_Back1FixedRotate);
      u_xlat5.z = u_xlat2.x;
      u_xlat5.y = u_xlat3.x;
      u_xlat5.x = (-u_xlat2.x);
      u_xlat2.y = dot(u_xlat0.xy, u_xlat5.xy);
      u_xlat2.x = dot(u_xlat0.xy, u_xlat5.yz);
      u_xlatb3 = equal(vec4(vec4(_FlagBack1MoveType, _FlagBack1MoveType, _FlagBack1MoveType, _FlagBack1MoveType)), vec4(2.0, 1.0, 0.0, -1.0));
      u_xlat2.xy = (u_xlatb3.w) ? u_xlat2.xy : u_xlat0.xy;
      u_xlat8.xy = (u_xlatb3.z) ? u_xlat8.xy : u_xlat2.xy;
      u_xlat2.xy = (-_Back1Tex_ST.xy) * vec2(0.5, 0.5) + u_xlat0.xy;
      u_xlat5.z = u_xlat1.x;
      u_xlat5.y = u_xlat4.x;
      u_xlat5.x = (-u_xlat1.x);
      u_xlat4.y = dot(u_xlat2.xy, u_xlat5.xy);
      u_xlat4.x = dot(u_xlat2.xy, u_xlat5.yz);
      u_xlat1.xw = _Back1Tex_ST.xy * vec2(0.5, 0.5) + u_xlat4.xy;
      u_xlat1.xy = (u_xlatb3.y) ? u_xlat1.xw : u_xlat8.xy;
      u_xlat1.z = float(0.0);
      u_xlat1.w = float(0.0);
      vs_TEXCOORD4 = (u_xlatb3.x) ? u_xlat0 : u_xlat1;
    }`;
    const frag = `

    uniform  sampler2D _MaskTex;
    uniform  sampler2D _DistortionTex;
    uniform  sampler2D _MainTex;
    uniform  sampler2D _Back1Tex;
    uniform  sampler2D _Front1Tex;
    uniform float _DistortionIntensityU;
    uniform float _DistortionIntensityV;
    uniform vec4 _Back1Color;
    uniform float _Front1Spiral;
    uniform vec4 _Front1Color;
    uniform float _FlagFront1RenderType;
    uniform vec4 _Color;
    uniform float _FlagBack1MoveType;
    uniform float _FlagBack1RenderType;
    uniform float _FlagFront1MoveType;
    uniform vec4 _Back1Tex_ST;
    uniform float _Back1Spiral;
    uniform vec4 _Front1Tex_ST;

    varying vec3 vs_TEXCOORD0;
    varying vec4 vs_TEXCOORD2;
    varying vec4 vs_TEXCOORD3;
    varying vec4 vs_TEXCOORD4;

    vec4 u_xlat0;
    vec4 u_xlat10_0;
    vec4 u_xlat1;
    vec4 u_xlat10_1;
    bool u_xlatb1;
    vec4 u_xlat2;
    bvec4 u_xlatb2;
    vec4 u_xlat3;
    bool u_xlatb3;
    vec4 u_xlat4;
    bool u_xlatb4;
    vec4 u_xlat5;
    vec3 u_xlat6;
    bool u_xlatb6;
    bool u_xlatb7;
    vec2 u_xlat12;
    bool u_xlatb12;
    float u_xlat13;
    bool u_xlatb13;
    float u_xlat14;
    bool u_xlatb14;
    float u_xlat15;
    bool u_xlatb15;
    float u_xlat18;
    bool u_xlatb18;
    float u_xlat19;
    float u_xlat20;
    float u_xlat21;

    void main() {
      u_xlat10_0 = texture2D(_MaskTex, vec2(50, 50));
      u_xlat1 = texture2D(_DistortionTex, vec2(0, 0));
      u_xlat1.xy = u_xlat1.xy + vec2(-0.5, -0.5);
      u_xlat1.xy = u_xlat1.xy * vec2(_DistortionIntensityU, _DistortionIntensityV);
      u_xlat12.xy = u_xlat1.xy * u_xlat10_0.zz + vs_TEXCOORD0.xy;
      u_xlat10_1 = texture2D(_MainTex, vs_TEXCOORD0.xy);
      u_xlatb2 = equal(vec4(_FlagBack1MoveType, _FlagBack1RenderType, _FlagBack1RenderType, _FlagFront1MoveType), vec4(2.0, 1.0, -1.0, 2.0));
      if(u_xlatb2.x){
          u_xlat12.xy = _Back1Tex_ST.xy * vec2(0.5, 0.5) + (-vs_TEXCOORD4.xy);
          u_xlat2.x = dot(u_xlat12.xy, u_xlat12.xy);
          u_xlat3.x = sqrt(u_xlat2.x);
          u_xlat2.x = min(abs(u_xlat12.y), abs(u_xlat12.x));
          u_xlat15 = max(abs(u_xlat12.y), abs(u_xlat12.x));
          u_xlat15 = float(1.0) / u_xlat15;
          u_xlat2.x = u_xlat2.x * u_xlat15;
          u_xlat15 = u_xlat2.x * u_xlat2.x;
          u_xlat21 = u_xlat15 * 0.0208350997 + -0.0851330012;
          u_xlat21 = u_xlat15 * u_xlat21 + 0.180141002;
          u_xlat21 = u_xlat15 * u_xlat21 + -0.330299497;
          u_xlat15 = u_xlat15 * u_xlat21 + 0.999866009;
          u_xlat21 = u_xlat2.x * u_xlat15;
          u_xlatb4 = abs(u_xlat12.y)<abs(u_xlat12.x);
          u_xlat21 = u_xlat21 * -2.0 + 1.57079637;
          u_xlat21 = u_xlatb4 ? u_xlat21 : float(0.0);
          u_xlat2.x = u_xlat2.x * u_xlat15 + u_xlat21;
          u_xlatb15 = u_xlat12.y<(-u_xlat12.y);
          u_xlat15 = u_xlatb15 ? -3.14159274 : float(0.0);
          u_xlat2.x = u_xlat2.x + u_xlat15;
          u_xlat15 = min(u_xlat12.y, u_xlat12.x);
          u_xlat12.x = max(u_xlat12.y, u_xlat12.x);
          u_xlatb18 = u_xlat15<(-u_xlat15);
          u_xlatb12 = u_xlat12.x>=(-u_xlat12.x);
          u_xlatb12 = u_xlatb12 && u_xlatb18;
          u_xlat12.x = (u_xlatb12) ? (-u_xlat2.x) : u_xlat2.x;
          u_xlat12.x = u_xlat3.x * (-_Back1Spiral) + u_xlat12.x;
          u_xlat3.y = u_xlat12.x + 3.14159274;
          u_xlat12.xy = u_xlat3.xy * vec2(0.159154937, 0.159154937) + vs_TEXCOORD4.zw;
          u_xlat3 = texture2D(_Back1Tex, u_xlat12.xy);
      } else {
          u_xlat3 = texture2D(_Back1Tex, vs_TEXCOORD4.xy);
      }
      u_xlat12.x = u_xlat10_0.y * _Back1Color.w;
      u_xlat4.w = u_xlat12.x * u_xlat3.w;
      u_xlat5.xyz = u_xlat3.xyz * _Back1Color.xyz;
      u_xlat4.xyz = u_xlat5.xyz + u_xlat5.xyz;
      u_xlat5 = (-u_xlat10_1) + u_xlat4;
      u_xlat4 = u_xlat4.wwww * u_xlat5 + u_xlat10_1;
      u_xlat5 = u_xlat10_0.yyyy * _Back1Color;
      u_xlat3 = u_xlat3 * u_xlat5;
      u_xlat5 = u_xlat3 * vec4(2.0, 2.0, 2.0, 2.0) + u_xlat10_1;
      u_xlat1 = (-u_xlat3) * vec4(2.0, 2.0, 2.0, 2.0) + u_xlat10_1;
      u_xlat1 = (u_xlatb2.z) ? u_xlat5 : u_xlat1;
      u_xlat1 = (u_xlatb2.y) ? u_xlat4 : u_xlat1;
      if(u_xlatb2.w){
        u_xlat6.xy = _Front1Tex_ST.xy * vec2(0.5, 0.5) + (-vs_TEXCOORD3.xy);
        u_xlat18 = dot(u_xlat6.xy, u_xlat6.xy);
        u_xlat2.x = sqrt(u_xlat18);
        u_xlat18 = min(abs(u_xlat6.y), abs(u_xlat6.x));
        u_xlat14 = max(abs(u_xlat6.y), abs(u_xlat6.x));
        u_xlat14 = float(1.0) / u_xlat14;
        u_xlat18 = u_xlat18 * u_xlat14;
        u_xlat14 = u_xlat18 * u_xlat18;
        u_xlat20 = u_xlat14 * 0.0208350997 + -0.0851330012;
        u_xlat20 = u_xlat14 * u_xlat20 + 0.180141002;
        u_xlat20 = u_xlat14 * u_xlat20 + -0.330299497;
        u_xlat14 = u_xlat14 * u_xlat20 + 0.999866009;
        u_xlat20 = u_xlat18 * u_xlat14;
        u_xlatb3 = abs(u_xlat6.y)<abs(u_xlat6.x);
        u_xlat20 = u_xlat20 * -2.0 + 1.57079637;
        u_xlat20 = u_xlatb3 ? u_xlat20 : float(0.0);
        u_xlat18 = u_xlat18 * u_xlat14 + u_xlat20;
        u_xlatb14 = u_xlat6.y<(-u_xlat6.y);
        u_xlat14 = u_xlatb14 ? -3.14159274 : float(0.0);
        u_xlat18 = u_xlat18 + u_xlat14;
        u_xlat14 = min(u_xlat6.y, u_xlat6.x);
        u_xlat6.x = max(u_xlat6.y, u_xlat6.x);
        u_xlatb12 = u_xlat14<(-u_xlat14);
        u_xlatb6 = u_xlat6.x>=(-u_xlat6.x);
        u_xlatb6 = u_xlatb6 && u_xlatb12;
        u_xlat6.x = (u_xlatb6) ? (-u_xlat18) : u_xlat18;
        u_xlat6.x = u_xlat2.x * (-_Front1Spiral) + u_xlat6.x;
        u_xlat2.y = u_xlat6.x + 3.14159274;
        u_xlat6.xy = u_xlat2.xy * vec2(0.159154937, 0.159154937) + vs_TEXCOORD3.zw;
        u_xlat2 = texture2D(_Front1Tex, u_xlat6.xy);
    } else {
        u_xlat2 = texture2D(_Front1Tex, vs_TEXCOORD3.xy);
    }

    u_xlat6.x = u_xlat10_0.x * _Front1Color.w;
    u_xlat3.w = u_xlat6.x * u_xlat2.w;
    u_xlat6.xyz = u_xlat2.xyz * _Front1Color.xyz;
    u_xlat3.xyz = u_xlat6.xyz + u_xlat6.xyz;
    u_xlat4 = (-u_xlat1) + u_xlat3;
    u_xlat3 = u_xlat3.wwww * u_xlat4 + u_xlat1;
    u_xlat0 = u_xlat10_0.xxxx * _Front1Color;
    u_xlat0 = u_xlat2 * u_xlat0;
    u_xlatb2.xy = equal(vec4(_FlagFront1RenderType), vec4(1.0, -1.0, 0.0, 0.0)).xy;
    u_xlat4 = u_xlat0 * vec4(2.0, 2.0, 2.0, 2.0) + u_xlat1;
    u_xlat0 = (-u_xlat0) * vec4(2.0, 2.0, 2.0, 2.0) + u_xlat1;
    u_xlat0 = (u_xlatb2.y) ? u_xlat4 : u_xlat0;
    u_xlat0 = (u_xlatb2.x) ? u_xlat3 : u_xlat0;
    gl_FragColor = u_xlat0 * _Color;
    }`;
    const uniforms = {
      in_POSITION0: { type: 'v4', value: new THREE.Vector4(1, 1, 0, 0) },
      in_TEXCOORD0: { type: 'v4', value: new THREE.Vector4(1, 1, 0, 0) },
      _MainTex_ST: { type: 'v4', value: new THREE.Vector4(1, 1, 0, 0) },
      _DistortionRotate: { type: 'f', value: 0.0 },
      _DistortionTex_ST: { type: 'v4', value: new THREE.Vector4(0.01, 0.04, 0, 0) },
      _DistortionScrollAngle: { type: 'f', value: 10.0 },
      _DistortionScrollV: { type: 'f', value: 2.0 },
      _DistortionScrollU: { type: 'f', value: 0.2 },
      _FlagDistortionMoveType: { type: 'f', value: 0.0 },
      _Front1ScrollAngle: { type: 'f', value: -34.0 },
      _Front1Tex_ST: { type: 'v4', value: new THREE.Vector4(1, 1.2, -2.366667, -1.854545) },
      _Front1ScrollV: { type: 'f', value: 2.6 },
      _Front1ScrollU: { type: 'f', value: -0.15 },
      _Front1Rotate: { type: 'f', value: 0.6 },
      _Front1FixedRotate: { type: 'f', value: 0.0 },
      _FlagFront1MoveType: { type: 'f', value: 1.0 },
      _Back1ScrollAngle: { type: 'f', value: -122.0 },
      _Back1Tex_ST: { type: 'v4', value: new THREE.Vector4(0.8, 0.8, 0, 0) },
      _Back1ScrollV: { type: 'f', value: 1.3 },
      _Back1ScrollU: { type: 'f', value: 5.2 },
      _Back1Rotate: { type: 'f', value: -0.18 },
      _Back1FixedRotate: { type: 'f', value: 0.0 },
      _FlagBack1MoveType: { type: 'f', value: 0.0 },
      _MaskTex: { type: 't', value: alphaMap },
      _DistortionTex: { type: 't', value: distortion },
      _Back1Tex: { type: 't', value: null },
      _Front1Tex: { type: 't', value: money },
      _DistortionIntensityU: { type: 'f', value: 0.05 },
      _DistortionIntensityV: { type: 'f', value: 0.06 },
      _Back1Color: { type: 'v4', value: new THREE.Vector4(0.2758622, 0.25, 1, 1) },
      _Front1Spiral: { type: 'f', value: 0.0 },
      _Front1Color: { type: 'v4', value: new THREE.Vector4(0.3867925, 0.2962313, 0.1733268, 1) },
      _FlagFront1RenderType: { type: 'f', value: 1.0 },
      _Color: { type: 'v4', value: new THREE.Vector4(1, 1, 1, 1) },
      _Time: { type: 'f', value: 0.1 },
    };

    const material2 = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: frag,
    });
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const moneyMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: frag,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const mesh2 = new THREE.Mesh(geometry, moneyMaterial);
    scene.add(mesh);
    scene.add(mesh2);
    // const cube = new THREE.Mesh(geometry, material2);

    // scene.add(cube);
    camera.position.z = 3;
    const animate = function (time) {
      uniforms._Time.value = clock.getElapsedTime();
      // mesh2.rotation.x += 0.01;
      // mesh2.rotation.z += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    // === THREE.JS CODE END ===
  }, []);
  return (
    <>
      <div />
    </>
  );
};

export default Test;
