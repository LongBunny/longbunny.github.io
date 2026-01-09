import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */class A{static lerp(e,r,a){return(1-a)*e+r*a}static srgb_to_linear(e){return Math.pow(e,2.2)}static clamp01(e){return Math.min(Math.max(e,0),1)}}class W{static rand(){return Math.random()}static range(e,r){return e+(r-e)*this.rand()}}class i{constructor(e,r,a){this.x=e,this.y=r,this.z=a}add(e){return typeof e=="number"?new i(this.x+e,this.y+e,this.z+e):new i(this.x+e.x,this.y+e.y,this.z+e.z)}sub(e){return typeof e=="number"?new i(this.x-e,this.y-e,this.z-e):new i(this.x-e.x,this.y-e.y,this.z-e.z)}mul(e){return new i(this.x*e,this.y*e,this.z*e)}mul_vec(e){return new i(this.x*e.x,this.y*e.y,this.z*e.z)}div(e){if(e===0)throw new Error("Can't div by 0");return new i(this.x/e,this.y/e,this.z/e)}sqr_mag(){return this.x*this.x+this.y*this.y+this.z*this.z}mag(){return Math.sqrt(this.sqr_mag())}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}cross(e){return new i(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)}normalize(){return this.div(this.mag())}reflect(e){return this.sub(e.mul(2*this.dot(e)))}refract(e,r){const a=this.normalize(),t=Math.min(a.mul(-1).dot(e),1),s=a.add(e.mul(t)).mul(r),o=e.mul(-Math.sqrt(Math.abs(1-s.sqr_mag())));return s.add(o)}near_zero(){return Math.abs(this.x)<1e-4&&Math.abs(this.y)<1e-4&&Math.abs(this.z)<1e-4}clamp01(){return new i(A.clamp01(this.x),A.clamp01(this.y),A.clamp01(this.z))}srgb_to_linear(){return new i(A.srgb_to_linear(this.x),A.srgb_to_linear(this.y),A.srgb_to_linear(this.z))}static lerp(e,r,a){return new i(A.lerp(e.x,r.x,a),A.lerp(e.y,r.y,a),A.lerp(e.z,r.z,a))}static zero(){return new i(0,0,0)}static one(){return new i(1,1,1)}static from_hex(e){const r=(e>>16&255)/255,a=(e>>8&255)/255,t=(e>>0&255)/255;return new i(r,a,t)}static random(){return new i(W.range(-1,1),W.range(-1,1),W.range(-1,1))}static random_in_unit_sphere(){for(;;){const e=this.random(),r=e.sqr_mag();if(!(r===0||r>=1))return e}}static random_unit_vector(){return this.random_in_unit_sphere().normalize()}static random_in_hemisphere(e){const r=this.random_in_unit_sphere();return r.dot(e)>0?r:r.mul(-1)}static random_cosine_direction(){const e=W.rand(),r=W.rand(),a=Math.sqrt(1-r),t=2*Math.PI*e,s=Math.cos(t)*Math.sqrt(r),o=Math.sin(t)*Math.sqrt(r);return new i(s,o,a)}static random_in_hemisphere_cosine(e){const r=e.normalize(),a=Math.abs(r.x)>.9?new i(0,1,0):new i(1,0,0),t=r.cross(a).normalize(),s=t.cross(r),o=this.random_cosine_direction();return s.mul(o.x).add(t.mul(o.y)).add(r.mul(o.z))}toString(){return`(${this.x}, ${this.y}, ${this.z})`}}class Ne{constructor(e,r,a,t,s){this.distance=e,this.point=r,this.normal=a,this.front_face=t,this.material=s}}class J{constructor(e,r,a){this.pos=e,this.r=r,this.material=a}intersects(e){const r=e.origin.sub(this.pos),a=e.dir.dot(e.dir),t=2*r.dot(e.dir),s=r.dot(r)-this.r*this.r,o=t*t-4*a*s;if(o<0)return null;const u=Math.sqrt(o),m=(-t-u)/(2*a),w=(-t+u)/(2*a),p=1e-4;let l=Number.POSITIVE_INFINITY;if(m>p)l=m;else if(w>p)l=w;else return null;const f=e.origin.add(e.dir.mul(l)),M=f.sub(this.pos).mul(1/this.r).normalize(),E=e.dir.dot(M)<0,z=E?M:M.mul(-1);return new Ne(l,f,z,E,this.material)}}class He{constructor(e){this.shapes=e}hit(e,r=1e-4,a=Number.POSITIVE_INFINITY){let t=a,s=null;for(const o of this.shapes){const u=o.intersects(e);u&&u.distance>r&&u.distance<t&&(t=u.distance,s=u)}return s}}class _e{constructor(e,r){this.origin=e,this.dir=r}at(e){return this.origin.add(this.dir.mul(e))}}class he{emitted(e){return i.zero()}}class ve extends he{constructor(e){super(),this.albedo=e}scatter(e,r){let a=i.random_in_hemisphere_cosine(r.normal);a.near_zero()&&(a=r.normal);const s=r.point.add(r.normal.mul(1e-4));return new xe(this.albedo,new _e(s,a.normalize()))}}class $e extends he{constructor(e){super(),this.emission=e}emitted(e){return e.front_face?this.emission:i.zero()}scatter(e,r){return null}}class Oe extends he{constructor(e,r=0){super(),this.albedo=e,this.fuzz=A.clamp01(r)}scatter(e,r){let t=e.dir.normalize().reflect(r.normal).add(i.random_in_unit_sphere().mul(this.fuzz));if(t.dot(r.normal)<=0)return null;const o=r.point.add(r.normal.mul(1e-4));return new xe(this.albedo,new _e(o,t.normalize()))}}class ye extends he{constructor(e){super(),this.ior=e}scatter(e,r){const a=i.one(),t=r.front_face?1/this.ior:this.ior,s=e.dir.normalize(),o=Math.min(s.mul(-1).dot(r.normal),1),u=Math.sqrt(1-o*o),m=t*u>1,w=ye.reflectance(o,t);let p;m||Math.random()<w?p=s.reflect(r.normal):p=s.refract(r.normal,t);const l=1e-4,f=p.dot(r.normal)>0?r.normal:r.normal.mul(-1),M=r.point.add(f.mul(l));return new xe(a,new _e(M,p.normalize()))}static reflectance(e,r){let a=(1-r)/(1+r);return a=a*a,a+(1-a)*Math.pow(1-e,5)}}class xe{constructor(e,r){this.attenuation=e,this.ray=r}}class we{constructor(e,r,a,t,s){this.bounces=e,this.samples=r,this.gamma_correction=a,this.exposure=t,this.tone_map=s}static default(){return new we(20,10,!0,1,"aces")}}function Ye(n,e,r,a,t,s,o){let u=i.zero();for(let m=0;m<o.samples;m++){const w=(n+W.rand())/r,p=(e+W.rand())/a,l=t.get_ray(w,p);u=u.add(Le(s,l,o.bounces))}return u=u.mul(1/o.samples),u}function Le(n,e,r,a){if(r<=0)return i.zero();const t=n.hit(e);if(!t)return We(e);const s=t.material.emitted(t),o=t.material.scatter(e,t);return o?s.add(o.attenuation.mul_vec(Le(n,o.ray,r-1))):s}function We(n){const e=n.dir.normalize(),r=new i(.3,.8,.6).normalize(),a=Math.max(0,e.dot(r)),t=Math.max(0,e.y),s=new i(.2,.45,.9),o=new i(.8,.6,.4),u=new i(1,.9,.6);let m=i.lerp(o,s,Math.pow(t,.5));return m=m.mul(.7+.3*t),m=m.add(u.mul(Math.pow(a,64))),m}class Xe{constructor(e,r){const a=e*Math.PI/180,s=2*Math.tan(a/2),o=r*s;this.origin=new i(0,0,0),this.horizontal=new i(o,0,0),this.vertical=new i(0,-s,0),this.lower_left_corner=this.origin.sub(this.horizontal.mul(.5)).sub(this.vertical.mul(.5)).add(new i(0,0,1))}get_ray(e,r){const a=this.lower_left_corner.add(this.horizontal.mul(e)).add(this.vertical.mul(r)).sub(this.origin);return new _e(this.origin,a.normalize())}}function Ze(n){const{renderCanvas:e,debugCanvas:r,onFrameDone:a}=n,t=e.getContext("2d"),s=r.getContext("2d");let o=!1,u=0,m=0,w=0,p=!0;const l=e.width,f=e.height;t.clearRect(0,0,l,f);const M=t.createImageData(l,f),E=M.data;let z=1,P=new Array(l*f).fill(i.zero());F();const T=we.default(),Z=new Xe(90,l/f);function ee(){return H()}let re=ee(),S=!1,C=0;function F(){P=P.map(()=>i.zero())}function ne(){F(),z=1,m=0,w=0,E.fill(0),t.clearRect(0,0,l,f),re=ee(),p=!0}function K(){if(!S)return;const c=performance.now(),g=14;for(;performance.now()-c<g;)re.next().done;t.putImageData(M,0,0),o&&(s.clearRect(0,0,l,f),s.fillStyle="red",s.strokeStyle="rgba(255, 0, 0, 0.5)",s.beginPath(),s.moveTo(0,u),s.lineTo(l,u),s.stroke()),p&&(a?.(_()),p=!1),C=requestAnimationFrame(K)}const ge=new He([new J(new i(0,-201,1),200,new ve(new i(.8,.8,.8))),new J(new i(-30,0,55),25,new ve(new i(.3,.4,.2).srgb_to_linear())),new J(new i(0,0,3),1,new ye(1.52)),new J(new i(-2.5,0,3),1,new Oe(new i(.8,.8,.8),.2)),new J(new i(2.5,0,3),1,new ve(i.from_hex(13204165).srgb_to_linear())),new J(new i(0,4,3),2,new $e(new i(1,1,1)))]);function*H(){for(console.log(`rendering: bounces = ${T.bounces}, samples = ${T.samples}`);;){const c=performance.now();for(let g=0;g<f;g++){o&&(u=g);for(let B=0;B<l;B++){const j=g*l+B,ae=Ye(B,g,l,f,Z,ge,T);P[j]=P[j].add(ae);let h=P[j].div(z);if(o&&B===Math.floor(l/2)&&g===Math.floor(f/2)&&console.log(`sample: ${z}, color: ${h}`),h=h.mul(T.exposure),h=$(h,T.tone_map),T.gamma_correction){const b=.45454545454545453;h=new i(Math.pow(h.x,b),Math.pow(h.y,b),Math.pow(h.z,b))}h=h.clamp01();const R=(g*l+B)*4;E[R+0]=h.x*255,E[R+1]=h.y*255,E[R+2]=h.z*255,E[R+3]=255,yield}}p=!0,z+=1,m=performance.now()-c,w+=m}}function $(c,g){switch(g){case"reinhard":return new i(c.x/(1+c.x),c.y/(1+c.y),c.z/(1+c.z));case"aces":return O(c);case"none":default:return c}}function O(c){const R=b=>b*(2.51*b+.03)/(b*(2.43*b+.59)+.14);return new i(R(c.x),R(c.y),R(c.z))}function U(){S||(S=!0,C=requestAnimationFrame(K))}function v(){S&&(S=!1,C&&(cancelAnimationFrame(C),C=0))}function te(c){o=c,o||s.clearRect(0,0,l,f)}function Y(){return T}function _(){return{frameSampleCount:z,lastFrameTimeMs:m,frameTimeSumMs:w}}return{start:U,stop:v,reRender:ne,setDebug:te,getSettings:Y,getStats:_}}const Ke=`struct Params {\r
  width: u32,\r
  height: u32,\r
  frame_index: u32,\r
  _pad: u32,\r
}\r
\r
const PI = 3.14159265359;\r
const F32_MAX = 3.4028235e37;\r
const EPS = 1.0e-4;\r
\r
const SAMPLES_COUNT = 20;\r
const MAX_DEPTH = 20;\r
\r
const SCENE_SIZE = 6;\r
var<private> SCENE: array<Sphere, SCENE_SIZE>;\r
\r
@group(0) @binding(0) var<uniform> params: Params;\r
@group(0) @binding(1) var prev_tex: texture_2d<f32>;\r
@group(0) @binding(2) var next_tex: texture_storage_2d<rgba16float, write>;\r
\r
@compute @workgroup_size(8, 8)\r
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {\r
    let x = gid.x;\r
    let y = gid.y;\r
\r
    if (x >= params.width || y >= params.height) { return; }\r
\r
    // TODO: set this from cpu\r
    let camera = get_camera(90.0, f32(params.width) / f32(params.height));\r
    SCENE = array<Sphere, SCENE_SIZE>(\r
        Sphere(vec3<f32>(0.0, -201.0, 1.0), 200.0, material_lambertian(vec3<f32>(0.8, 0.8, 0.8))),\r
        Sphere(vec3<f32>(-30.0, 0.0, 55.0), 25.0, material_lambertian(vec3<f32>(0.3, 0.4, 0.2))),\r
        Sphere(vec3<f32>(0.0, 0.0, 3.0), 1.0, material_dielectric(1.52)),\r
        Sphere(vec3<f32>(-2.5, 0.0, 3.0), 1.0, material_metal(vec3<f32>(0.8, 0.8, 0.8), 0.2)),\r
        Sphere(vec3<f32>(2.5, 0.0, 3.0), 1.0, material_lambertian(vec3<f32>(0.59, 0.19, 0.56))),\r
        Sphere(vec3<f32>(0.0, 4.0, 3.0), 2.0, material_diffuse_light(vec3<f32>(1.0, 1.0, 1.0))),\r
    );\r
\r
    var seed: u32 = gid.x + gid.y * 4096u * 7919u + params.frame_index * 104729u;\r
    let color = path_trace(x, y, camera, &seed).xyz;\r
\r
    var avg = color;\r
    if (params.frame_index > 0u) {\r
        let prev_avg = textureLoad(prev_tex, vec2<i32>(i32(x), i32(y)), 0).xyz;\r
        let t = 1.0 / f32(params.frame_index + 1u);\r
        avg = prev_avg + (color - prev_avg) * t;\r
    }\r
\r
    textureStore(next_tex, vec2<i32>(i32(x), i32(y)), vec4<f32>(avg, 1.0));\r
}\r
\r
struct Sphere {\r
    pos: vec3<f32>,\r
    radius: f32,\r
    material: Material,\r
}\r
\r
struct Ray {\r
    origin: vec3<f32>,\r
    dir: vec3<f32>,\r
}\r
\r
struct HitInfo {\r
    hit: bool,\r
    distance: f32,\r
    hit_point: vec3<f32>,\r
    hit_normal: vec3<f32>,\r
    front_face: bool,\r
    material: Material,\r
}\r
\r
const MATERIAL_TYPE_LAMBERTIAN = 0;\r
const MATERIAL_TYPE_DIFFUSE_LIGHT = 1;\r
const MATERIAL_TYPE_METAL = 2;\r
const MATERIAL_TYPE_DIELECTRIC = 3;\r
\r
struct Material {\r
    material_type: u32,\r
\r
    // lambertian & metal\r
    albedo: vec3<f32>,\r
\r
    // metal\r
    fuzz: f32,\r
\r
    // diffuse light\r
    emission: vec3<f32>,\r
\r
    // dielectric\r
    ior: f32,\r
}\r
\r
fn material_lambertian(albedo: vec3<f32>) -> Material {\r
    var material = Material();\r
    material.material_type = MATERIAL_TYPE_LAMBERTIAN;\r
    material.albedo = albedo;\r
    return material;\r
}\r
\r
fn material_diffuse_light(emission: vec3<f32>) -> Material {\r
    var material = Material();\r
    material.material_type = MATERIAL_TYPE_DIFFUSE_LIGHT;\r
    material.emission = emission;\r
    return material;\r
}\r
\r
fn material_metal(albedo: vec3<f32>, fuzz: f32) -> Material {\r
    var material = Material();\r
    material.material_type = MATERIAL_TYPE_METAL;\r
    material.albedo = albedo;\r
    material.fuzz = fuzz;\r
    return material;\r
}\r
\r
fn material_dielectric(ior: f32) -> Material {\r
    var material = Material();\r
    material.material_type = MATERIAL_TYPE_DIELECTRIC;\r
    material.ior = ior;\r
    return material;\r
}\r
\r
struct Scatter {\r
    hit: bool,\r
    attenuation: vec3<f32>,\r
    ray: Ray,\r
}\r
\r
struct Camera {\r
    origin: vec3<f32>,\r
    horizontal: vec3<f32>,\r
    vertical: vec3<f32>,\r
    lower_left_corner: vec3<f32>,\r
}\r
\r
fn get_camera(fov: f32, aspect: f32) -> Camera {\r
    let theta = (fov * PI) / 180.0;\r
    let h = tan(theta / 2.0);\r
    let viewport_height = 2.0 * h;\r
    let viewport_width = aspect * viewport_height;\r
\r
    let origin = vec3<f32>(0.0);\r
    let horizontal = vec3<f32>(viewport_width, 0.0, 0.0);\r
    let vertical = vec3<f32>(0.0, -viewport_height, 0.0);\r
    let lower_left_corner = origin - (horizontal * 0.5) - (vertical * 0.5) + vec3<f32>(0.0, 0.0, 1.0);\r
\r
    return Camera(origin, horizontal, vertical, lower_left_corner);\r
}\r
\r
fn get_ray(camera: Camera, u: f32, v: f32) -> Ray {\r
    let dir = camera.lower_left_corner\r
        + (camera.horizontal * u)\r
        + (camera.vertical * v)\r
        - camera.origin;\r
    return Ray(camera.origin, dir);\r
}\r
\r
fn intersects(ray: Ray, sphere: Sphere) -> HitInfo {\r
    var hit_info = HitInfo();\r
    hit_info.hit = false;\r
\r
    let oc = ray.origin - sphere.pos;\r
\r
    let a = dot(ray.dir, ray.dir);\r
    let b = 2.0 * dot(oc, ray.dir);\r
    let c = dot(oc, oc) - sphere.radius * sphere.radius;\r
\r
    let discriminant = b * b - 4 * a * c;\r
\r
    if discriminant < 0.0 {\r
        return hit_info;\r
    }\r
\r
    let sqr_dist = sqrt(discriminant);\r
    let t1 = (-b - sqr_dist) / (2.0 * a);\r
    let t2 = (-b + sqr_dist) / (2.0 * a);\r
\r
    var t = F32_MAX;\r
    if t1 > EPS { t = t1; }\r
    else if t2 > EPS { t = t2; }\r
    else {\r
        return hit_info;\r
    }\r
\r
    let hit_point = ray.origin + (ray.dir * t);\r
    let hit_normal = normalize((hit_point - sphere.pos) / sphere.radius);\r
\r
    let front_face = dot(ray.dir, hit_normal) < 0.0;\r
    var normal = vec3<f32>();\r
    if front_face {\r
        normal = hit_normal;\r
    } else {\r
        normal = hit_normal * -1.0;\r
    }\r
\r
    hit_info.hit = true;\r
    hit_info.distance = t;\r
    hit_info.hit_point = hit_point;\r
    hit_info.hit_normal = normal;\r
    hit_info.front_face = front_face;\r
    hit_info.material = sphere.material;\r
    return hit_info;\r
}\r
\r
fn scene_hit(ray: Ray) -> HitInfo {\r
    var closest = F32_MAX;\r
    var best = HitInfo();\r
    for (var i = 0; i < SCENE_SIZE; i++) {\r
        let hit = intersects(ray, SCENE[i]);\r
        if !hit.hit { continue; }\r
\r
        if hit.distance > EPS && hit.distance < closest {\r
            closest = hit.distance;\r
            best = hit;\r
        }\r
    }\r
\r
    return best;\r
}\r
\r
\r
fn path_trace(x: u32, y: u32, camera: Camera, seed: ptr<function, u32>) -> vec4<f32> {\r
    var color = vec3<f32>(0.0);\r
\r
    for (var s = 0; s < SAMPLES_COUNT; s++) {\r
        let u = (f32(x) + rng_next_f32(seed)) / f32(params.width);\r
        let v = (f32(y) + rng_next_f32(seed)) / f32(params.height);\r
\r
        var throughput = vec3<f32>(1.0);\r
        var accum = vec3<f32>(0.0);\r
        var ray = get_ray(camera, u, v);\r
\r
        for (var d = MAX_DEPTH; d > 0; d--) {\r
            let r = radiance(ray, seed);\r
\r
            if !r.hit {\r
                accum += throughput * r.attenuation;\r
                break;\r
            }\r
\r
            if r.emitted_hit {\r
                accum += throughput * r.emitted;\r
                break;\r
            } else {\r
                throughput *= r.attenuation;\r
            }\r
\r
            ray = r.ray;\r
        }\r
        color += accum;\r
    }\r
\r
    color *= 1.0 / SAMPLES_COUNT;\r
\r
    return vec4<f32>(color, 1.0);\r
}\r
\r
struct RadianceResult {\r
    hit: bool,\r
    emitted_hit: bool,\r
    attenuation: vec3<f32>,\r
    emitted: vec3<f32>,\r
    ray: Ray,\r
}\r
\r
fn radiance(ray: Ray, seed: ptr<function, u32>) -> RadianceResult {\r
    var result = RadianceResult();\r
    result.hit = false;\r
\r
    let hit = scene_hit(ray);\r
\r
    if !hit.hit {\r
        result.attenuation = background(ray);\r
        return result;\r
    }\r
\r
    let material_type = hit.material.material_type;\r
    switch material_type {\r
        case MATERIAL_TYPE_LAMBERTIAN: {\r
            let s = scatter_lambertian(ray, hit, seed);\r
            result.hit = true;\r
            result.attenuation = s.attenuation;\r
            result.ray = s.ray;\r
            return result;\r
        }\r
        case MATERIAL_TYPE_DIFFUSE_LIGHT: {\r
            let e = emitted(hit);\r
            result.hit = true;\r
            result.emitted_hit = true;\r
            result.emitted = e;\r
            return result;\r
        }\r
        case MATERIAL_TYPE_METAL: {\r
            let s = scatter_metal(ray, hit, seed);\r
            result.hit = true;\r
            result.attenuation = s.attenuation;\r
            result.ray = s.ray;\r
            return result;\r
        }\r
        case MATERIAL_TYPE_DIELECTRIC: {\r
            let s = scatter_dielectric(ray, hit, seed);\r
            result.hit = true;\r
            result.attenuation = s.attenuation;\r
            result.ray = s.ray;\r
            return result;\r
        }\r
        default: {\r
            return result;\r
        }\r
    }\r
\r
    // unreachable\r
    return result;\r
    // no recursion :)\r
    // let result = s.attenuation * radiance(s.ray, depth - 1, seed);\r
}\r
\r
fn scatter_lambertian(ray: Ray, hit: HitInfo, seed: ptr<function, u32>) -> Scatter {\r
    var dir = random_in_hemisphere_cosine(hit.hit_normal, seed);\r
    if near_zero(dir) { dir = hit.hit_normal; }\r
    let origin = hit.hit_point + (hit.hit_normal * EPS);\r
    return Scatter(true, hit.material.albedo, Ray(origin, normalize(dir)));\r
}\r
\r
fn scatter_metal(ray: Ray, hit: HitInfo, seed: ptr<function, u32>) -> Scatter {\r
    var result = Scatter();\r
    result.hit = false;\r
\r
    let reflected = reflect(normalize(ray.dir), hit.hit_normal);\r
    let dir = reflected + random_in_unit_sphere(seed) * hit.material.fuzz;\r
\r
    if dot(dir, hit.hit_normal) <= 0 { return result; }\r
\r
    let origin = hit.hit_point + (hit.hit_normal * EPS);\r
    result.hit = true;\r
    result.attenuation = hit.material.albedo;\r
    result.ray = Ray(origin, normalize(dir));\r
    return result;\r
}\r
\r
fn scatter_dielectric(ray: Ray, hit: HitInfo, seed: ptr<function, u32>) -> Scatter {\r
    var result = Scatter();\r
    result.hit = false;\r
\r
    let attenuation = vec3<f32>(1.0);\r
\r
    var refraction_ratio: f32;\r
    if hit.front_face { refraction_ratio = 1.0 / hit.material.ior; }\r
    else { refraction_ratio = hit.material.ior; };\r
\r
    let unit_dir = normalize(ray.dir);\r
    let cos_theta = min(dot(unit_dir * -1.0, hit.hit_normal), 1.0);\r
    let sin_theta = sqrt(1.0 - cos_theta * cos_theta);\r
\r
    let cannot_refract = refraction_ratio * sin_theta > 1.0;\r
    let reflect_probability = reflectance(cos_theta, refraction_ratio);\r
\r
    var dir: vec3<f32>;\r
    if cannot_refract || rng_next_f32(seed) < reflect_probability {\r
        dir = reflect(unit_dir, hit.hit_normal);\r
    } else {\r
        dir = refract(unit_dir, hit.hit_normal, refraction_ratio);\r
    }\r
\r
    var offset: vec3<f32>;\r
    if dot(dir, hit.hit_normal) > 0 { offset = hit.hit_normal; } else { offset = hit.hit_normal * -1.0; }\r
    let origin = hit.hit_point + (offset * EPS);\r
\r
    result.hit = true;\r
    result.attenuation = attenuation;\r
    result.ray = Ray(origin, normalize(dir));\r
    return result;\r
}\r
\r
fn reflectance(cosine: f32, ref_index: f32) -> f32 {\r
    var r0 = (1.0 - ref_index) / (1.0 + ref_index);\r
    r0 = r0 * r0;\r
    return r0 + (1.0 - r0) * pow((1.0 - cosine), 5);\r
}\r
\r
fn emitted(hit: HitInfo) -> vec3<f32> {\r
    if hit.front_face { return hit.material.emission; }\r
    else { return vec3<f32>(0.0); }\r
}\r
\r
\r
\r
fn background(ray: Ray) -> vec3<f32> {\r
//    return vec3<f32>(0.0);\r
    let d = normalize(ray.dir);\r
    let sun_dir = normalize(vec3<f32>(0.3, 0.8, 0.6));\r
\r
    let sun_amt = max(0.0, dot(d, sun_dir));\r
    let sky_amt = max(0.0, d.y);\r
\r
    let sky_col = vec3<f32>(0.2, 0.45, 0.9);\r
    let horizon_col = vec3<f32>(0.8, 0.6, 0.4);\r
    let sun_col = vec3<f32>(1.0, 0.9, 0.6);\r
\r
    var col = lerp_v3(horizon_col, sky_col, pow(sky_amt, 0.5));\r
    col *= 0.7 + 0.3 * sky_amt;\r
    col += sun_col * pow(sun_amt, 64);\r
    return col;\r
}\r
\r
\r
// helpers\r
fn hash_u32(seed: u32) -> u32 {\r
    var v = seed;\r
    v ^= v >> 16u;\r
    v *= 0x7feb352du;\r
    v ^= v >> 15u;\r
    v *= 0x846ca68bu;\r
    v ^= v >> 16u;\r
    return v;\r
}\r
\r
fn rng_next_u32(seed: ptr<function, u32>) -> u32 {\r
    (*seed) = (*seed) + 0x9e3779b9u;\r
    return hash_u32(*seed);\r
}\r
\r
fn rng_next_f32(seed: ptr<function, u32>) -> f32 {\r
  return f32(rng_next_u32(seed)) / 4294967296.0;\r
}\r
\r
fn rng_next_v3(min: f32, max: f32, seed: ptr<function, u32>) -> vec3<f32> {\r
    let x = min + (max - min) * rng_next_f32(seed);\r
    let y = min + (max - min) * rng_next_f32(seed);\r
    let z = min + (max - min) * rng_next_f32(seed);\r
    return vec3<f32>(x, y, z);\r
}\r
\r
fn lerp(a: f32, b: f32, t: f32) -> f32 {\r
    return (1.0 - t) * a + b * t;\r
}\r
\r
fn lerp_v3(a: vec3<f32>, b: vec3<f32>, t: f32) -> vec3<f32> {\r
    return vec3<f32>(\r
        lerp(a.x, b.x, t),\r
        lerp(a.y, b.y, t),\r
        lerp(a.z, b.z, t)\r
    );\r
}\r
\r
fn random_in_unit_sphere(seed: ptr<function, u32>) -> vec3<f32> {\r
    loop {\r
        let p = rng_next_v3(-1.0, 1.0, seed);\r
        let mag2 = dot(p, p);\r
        if mag2 == 0 || mag2 >= 1.0 { continue; }\r
        return p;\r
    }\r
    return vec3<f32>(1.0, 0.0, 0.0);\r
}\r
\r
fn random_cosine_direction(seed: ptr<function, u32>) -> vec3<f32> {\r
    let r1 = rng_next_f32(seed);\r
    let r2 = rng_next_f32(seed);\r
    let z = sqrt(1.0 - r2);\r
    let phi = 2.0 * PI * r1;\r
    let r2sqrt = sqrt(r2);\r
    let x = cos(phi) * r2sqrt;\r
    let y = sin(phi) * r2sqrt;\r
    return vec3<f32>(x, y, z);\r
}\r
\r
fn random_in_hemisphere_cosine(n: vec3<f32>, seed: ptr<function, u32>) -> vec3<f32> {\r
    let w = normalize(n);\r
    var a = vec3<f32>();\r
    if abs(w.x) > 0.9 { a = vec3<f32>(0.0, 1.0, 0.0); } else { a = vec3<f32>(1.0, 0.0, 0.0); }\r
    let v = normalize(cross(w, a));\r
    let u = cross(v, w);\r
    let d = random_cosine_direction(seed);\r
    return (u * d.x) + (v * d.y) + (w * d.z);\r
}\r
\r
fn near_zero(v: vec3<f32>) -> bool {\r
    return abs(v.x) < EPS && abs(v.y) < EPS && abs(v.z) < EPS;\r
}\r
\r
fn hex_to_vec3(hex: u32) -> vec3<f32> {\r
    let r = f32((hex >> (8 * 2)) & 0xFF) / 255.0;\r
    let g = f32((hex >> (8 * 1)) & 0xFF) / 255.0;\r
    let b = f32((hex >> (8 * 0)) & 0xFF) / 255.0;\r
    return vec3<f32>(r, g, b);\r
}\r
`,je=`struct VSOut {\r
    @builtin(position) pos : vec4<f32>,\r
    @location(0) uv : vec2<f32>,\r
};\r
\r
@vertex\r
fn vs_main(@builtin(vertex_index) vid : u32) -> VSOut {\r
    var positions = array<vec2<f32>, 3>(\r
        vec2<f32>(-1.0, -1.0),\r
        vec2<f32>(3.0, -1.0),\r
        vec2<f32>(-1.0, 3.0),\r
    );\r
\r
    var uvs = array<vec2<f32>, 3>(\r
        vec2<f32>(0.0, 0.0),\r
        vec2<f32>(2.0, 0.0),\r
        vec2<f32>(0.0, 2.0),\r
    );\r
\r
    var out: VSOut;\r
    out.pos = vec4<f32>(positions[vid], 0.0, 1.0);\r
    out.uv = uvs[vid];\r
    return out;\r
}\r
\r
@group(0) @binding(0) var samp: sampler;\r
@group(0) @binding(1) var accum_tex: texture_2d<f32>;\r
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
    let uv = vec2(in.uv.x, 1.0 - in.uv.y);\r
    var color = textureSample(accum_tex, samp, uv).xyz;
\r
    // tonemap\r
    color = aces_filmic(color);\r
\r
    // gamma\r
    let inverse = 1.0 / 2.2;\r
    color = vec3<f32>(\r
        pow(color.x, inverse),\r
        pow(color.y, inverse),\r
        pow(color.z, inverse)\r
    );\r
\r
    return vec4<f32>(color, 1.0);\r
}\r
\r
fn aces_filmic(color: vec3<f32>) -> vec3<f32> {\r
    let a = 2.51;\r
    let b = 0.03;\r
    let c = 2.43;\r
    let d = 0.59;\r
    let e = 0.14;\r
    return vec3<f32>(\r
        filmic(color.x, a, b, c, d, e),\r
        filmic(color.y, a, b, c, d, e),\r
        filmic(color.z, a, b, c, d, e)\r
    );\r
}\r
\r
fn filmic(x: f32, a: f32, b: f32, c: f32, d: f32, e: f32) -> f32 {\r
    return (x * (a * x + b)) / (x * (c * x + d) + e);\r
}
`;function Je(){return"gpu"in navigator?!0:(console.error("WebGPU is not supported in your browser."),!1)}async function Qe(n,e={}){const r=n.getContext("webgpu"),a=await navigator.gpu.requestAdapter();if(!a)throw new Error("Failed to get GPU adapter.");const t=await a.requestDevice();if(!t)throw new Error("Failed to get GPU device.");const s=navigator.gpu.getPreferredCanvasFormat();function o(){const _=Math.max(1,window.devicePixelRatio||1),c=Math.floor(n.clientWidth*_),g=Math.floor(n.clientHeight*_);return(n.width!==c||n.height!==g)&&(n.width=c,n.height=g),{width:n.width,height:n.height}}const u=await Ve(),m=await er(),w=t.createShaderModule({code:u});{const _=await w.getCompilationInfo();for(const c of _.messages)console.log(`[WGSL ${c.type}] line ${c.lineNum}:${c.linePos} - raytrace: ${c.message}`)}const p=t.createShaderModule({code:m});{const _=await p.getCompilationInfo();for(const c of _.messages)console.log(`[WGSL ${c.type}] line ${c.lineNum}:${c.linePos} - screen: ${c.message}`)}const l=t.createComputePipeline({layout:"auto",compute:{module:w,entryPoint:"main"}}),f=t.createRenderPipeline({layout:"auto",vertex:{module:p,entryPoint:"vs_main"},fragment:{module:p,entryPoint:"fs_main",targets:[{format:s}]},primitive:{topology:"triangle-list"}}),M=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),E=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let z=null,P=null,T=null,Z=null,ee=null,re=null,S=0,C=!0,F=0,ne=0;function K(){const{width:_,height:c}=o();return r.configure({device:t,format:s,alphaMode:"opaque"}),S=0,F=0,ne=0,C=!0,t.queue.writeBuffer(E,0,new Uint32Array([_,c,S,0])),z?.destroy(),P?.destroy(),z=t.createTexture({size:{width:_,height:c},format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),P=t.createTexture({size:{width:_,height:c},format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),T=z.createView(),Z=P.createView(),ee=[t.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:E}},{binding:1,resource:T},{binding:2,resource:Z}]}),t.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:E}},{binding:1,resource:Z},{binding:2,resource:T}]})],re=[t.createBindGroup({layout:f.getBindGroupLayout(0),entries:[{binding:0,resource:M},{binding:1,resource:Z}]}),t.createBindGroup({layout:f.getBindGroupLayout(0),entries:[{binding:0,resource:M},{binding:1,resource:T}]})],{width:_,height:c}}function ge(){K()}let{width:H,height:$}=K(),O=!0,U=!1,v=0,te=e.maxFps??30;function Y(_=performance.now()){if(!O)return;if(U){v=0;return}const c=te>0?1e3/te:0;if(c>0&&_-F<c){v=requestAnimationFrame(Y);return}F=_;const g=performance.now(),B=H,j=$;({width:H,height:$}=o()),(B!==H||j!==$)&&K();const ae=C?0:1;t.queue.writeBuffer(E,0,new Uint32Array([H,$,S,0]));const h=t.createCommandEncoder();{const b=h.beginComputePass();b.setPipeline(l),b.setBindGroup(0,ee[ae]),b.dispatchWorkgroups(Math.ceil(H/8),Math.ceil($/8)),b.end()}{const b=r.getCurrentTexture().createView(),ie=h.beginRenderPass({colorAttachments:[{view:b,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});ie.setPipeline(f),ie.setBindGroup(0,re[ae]),ie.draw(3,1,0,0),ie.end()}const R=S+1;t.queue.submit([h.finish()]),t.queue.onSubmittedWorkDone().then(()=>{F=performance.now()-g,ne+=F,e.onFrameDone?.({frameSampleCount:R,lastFrameTimeMs:F,frameTimeSumMs:ne})}),C=!C,S+=1,U||(v=requestAnimationFrame(Y))}return v=requestAnimationFrame(Y),{stop:()=>{O=!1,U=!1,v&&(cancelAnimationFrame(v),v=0),z?.destroy(),P?.destroy()},setMaxFps:_=>{te=Math.max(1,Math.floor(_))},pause:()=>{O&&(U=!0,v&&(cancelAnimationFrame(v),v=0))},resume:()=>{!O||!U||(U=!1,v||(v=requestAnimationFrame(Y)))},clear:()=>{ge(),O&&!U&&!v&&(v=requestAnimationFrame(Y))}}}async function Ve(){return Ke}async function er(){return je}const Ee=document.getElementById("render_canvas"),Q=document.getElementById("debug_canvas"),ze=document.getElementById("webgpu_canvas"),d=Ze({renderCanvas:Ee,debugCanvas:Q,onFrameDone:n=>{qe(n)}}),rr="CPU";let y="CPU",N=null;const L=d.getSettings(),Te=document.getElementById("render_btn"),nr=document.getElementById("clear_btn"),tr=document.querySelectorAll('input[name="renderer"]'),ar=document.getElementById("renderer_cpu"),Fe=document.getElementById("renderer_webgpu"),k=document.getElementById("bounces_input"),Ie=document.getElementById("bounces_value"),q=document.getElementById("samples_input"),Me=document.getElementById("samples_value"),D=document.getElementById("exposure_input"),Se=document.getElementById("exposure_value"),oe=document.getElementById("tone_map_select"),ce=document.getElementById("gamma_checkbox"),ue=document.getElementById("debug_checkbox"),X=document.getElementById("webgpu_fps_input"),Ue=document.getElementById("webgpu_fps_value"),Pe=document.getElementById("accum_frame_span"),de=document.getElementById("last_render_time_span"),me=document.getElementById("average_render_time_span"),Ce=document.getElementById("total_render_time_span");let G=!1,fe=30;const ir=20,sr=20,or=1,cr="aces",lr=!0;let x=!1;const Re=Je();Re||(Fe.disabled=!0);tr.forEach(n=>{n.addEventListener("change",()=>{n.checked&&dr(n.value)})});addEventListener("keydown",n=>{n.key!=="r"||n.ctrlKey||V()});ce.addEventListener("change",()=>{L.gamma_correction=ce.checked,V()});ue.addEventListener("change",()=>{G=ue.checked,y==="CPU"&&d.setDebug(G)});Te.addEventListener("click",()=>void _r());nr.addEventListener("click",()=>pr());k.addEventListener("change",()=>{L.bounces=parseInt(k.value),V()});k.addEventListener("input",()=>Ie.innerText=k.value);q.addEventListener("change",()=>{L.samples=parseInt(q.value),V()});q.addEventListener("input",()=>Me.innerText=q.value);D.addEventListener("change",()=>{L.exposure=parseFloat(D.value),V()});D.addEventListener("input",()=>Se.innerText=D.value);oe.addEventListener("change",()=>{L.tone_map=oe.value,V()});X.addEventListener("change",()=>{fe=parseInt(X.value),N?.setMaxFps(fe)});X.addEventListener("input",()=>Ue.innerText=X.value);pe();le(rr);se();be();ur();I();function ur(n){{d.setDebug(G),d.start(),x=!0,I();return}}async function dr(n){if(n!==y){if(mr(),y=n,se(),n==="CPU"){be(),d.setDebug(G),d.start(),d.reRender(),x=!0,I();return}if(!Re){y="CPU",le("CPU"),se(),d.setDebug(G),d.start(),x=!0,I();return}Be(),ke(),pe();try{await Ge(),x=!0,I()}catch(e){console.error(e),le("CPU"),y="CPU",se(),be(),d.setDebug(G),d.start(),x=!0,I()}}}function V(){y==="CPU"&&(pe(),d.start(),d.reRender(),x=!0,I())}function mr(){y==="CPU"?d.stop():(N?.stop(),N=null),x=!1,I()}function se(){const n=y==="CPU",e=y==="WebGPU";Te.disabled=!1,k.disabled=!n,q.disabled=!n,D.disabled=!n,oe.disabled=!n,ce.disabled=!n,ue.disabled=!n,X.disabled=!e,n||(d.setDebug(!1),pe()),e&&De()}function be(){Ee.style.display="block",Q.style.display="block",ze.style.display="none"}function Be(){Ee.style.display="none",Q.style.display="none",ze.style.display="block"}function ke(){Q.getContext("2d")?.clearRect(0,0,Q.width,Q.height)}function pe(){ce.checked=L.gamma_correction,ue.checked=G,k.value=""+L.bounces,Ie.innerText=k.value,q.value=""+L.samples,Me.innerText=q.value,D.value=""+L.exposure,Se.innerText=D.value,oe.value=L.tone_map,le(y),X.value=""+fe,Ue.innerText=X.value,Pe.innerText="0",de.innerText="-",me.innerText="-",Ce.innerText="-",y==="WebGPU"&&De()}function Ae(){Pe.innerText="0",de.innerText="-",me.innerText="-",Ce.innerText="-"}function qe(n){n.frameSampleCount>1?(de.innerText=`${(n.lastFrameTimeMs/1e3).toFixed(3)}s`,me.innerText=`${(n.frameTimeSumMs/(n.frameSampleCount-1)/1e3).toFixed(3)}s`):(de.innerText="-",me.innerText="-"),Ce.innerText=`${(n.frameTimeSumMs/1e3).toFixed(3)}s`,Pe.innerText=`${n.frameSampleCount-1}`}function fr(n){qe(n)}function De(){k.value=""+sr,Ie.innerText=k.value,q.value=""+ir,Me.innerText=q.value,D.value=""+or,Se.innerText=D.value,oe.value=cr,ce.checked=lr}async function _r(){if(x){gr();return}await hr()}async function hr(){if(y==="CPU"){d.start(),x=!0,I();return}if(!Re){y="CPU",le("CPU"),se(),d.setDebug(G),d.start(),x=!0,I();return}Be(),ke();try{N?N.resume():await Ge(),x=!0,I()}catch(n){console.error(n)}}function le(n){ar.checked=n==="CPU",Fe.checked=n==="WebGPU"}async function Ge(){N=await Qe(ze,{maxFps:fe,onFrameDone:n=>fr(n)})}function I(){Te.innerText=x?"stop":"start"}function pr(){if(y==="CPU"){d.reRender(),x&&d.start(),Ae();return}N?.clear(),Ae()}function gr(){y==="CPU"?d.stop():N?.pause(),x=!1,I()}
