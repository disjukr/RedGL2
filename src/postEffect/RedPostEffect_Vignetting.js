"use strict";
//TODO: 좀더 정리해야함
var RedPostEffect_Vignetting;
(function () {
    var makeProgram;

    RedPostEffect_Vignetting = function (redGL) {
        if (!(this instanceof RedPostEffect_Vignetting)) return new RedPostEffect_Vignetting(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_Vignetting : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['size'] = 0.1;
        this['indensity'] = 0.85;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this)
        console.log(this)

        this.bind = function (gl) {
            this['frameBuffer'].bind(gl);
        }
        this.unbind = function (gl) {
            this['frameBuffer'].unbind(gl);
        }
    }
    makeProgram = (function () {
        var vSource, fSource;
        var PROGRAM_NAME;
        vSource = function () {
            /*
            void main(void) {
                vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
                gl_Position = uPMatrix * uCameraMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;    
            uniform float uSize;
            uniform float uIndensity;            
            void main(void) {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
                float dist = distance(vTexcoord, vec2(0.5, 0.5));
                finalColor.rgb *= smoothstep(0.8, uSize * 0.799, dist * (uIndensity + uSize));
                gl_FragColor = finalColor;
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_Vignetting_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPostEffect_Vignetting.prototype = RedBaseMaterial.prototype
    RedPostEffect_Vignetting['NORMAL'] = [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ]
    RedPostEffect_Vignetting['SHARPEN'] = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0

    ]
    RedPostEffect_Vignetting['BLUR'] = [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ]
    RedPostEffect_Vignetting['EDGE'] = [
        0, 1, 0,
        1, -4, 1,
        0, 1, 0
    ]
    RedPostEffect_Vignetting['EMBOSS'] = [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
    Object.freeze(RedPostEffect_Vignetting)
})();