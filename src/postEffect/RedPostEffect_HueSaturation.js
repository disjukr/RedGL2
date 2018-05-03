"use strict";
//TODO: 좀더 정리해야함
var RedPostEffect_HueSaturation;
(function () {
    var makeProgram;

    RedPostEffect_HueSaturation = function (redGL) {
        if (!(this instanceof RedPostEffect_HueSaturation)) return new RedPostEffect_HueSaturation(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedPostEffect_HueSaturation : RedGL Instance만 허용됩니다.', redGL)
        this['frameBuffer'] = RedFrameBuffer(redGL);
        this['diffuseTexture'] = null;
        this['hue'] = 0;
        this['saturation'] = 0;
        /////////////////////////////////////////
        // 일반 프로퍼티
        this['program'] = makeProgram(this, redGL);
        this['_UUID'] = RedGL['makeUUID']();
        this.checkProperty()
        // Object.seal(this)
        console.log(this)
        this.updateTexture = function (lastFrameBufferTexture) {
            this['diffuseTexture'] = lastFrameBufferTexture
        }
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
                gl_Position = uPMatrix * uMMatrix *  vec4(aVertexPosition, 1.0);
            }
            */
        }
        fSource = function () {
            /*
            precision mediump float;
            uniform sampler2D uDiffuseTexture;    
            uniform float uHue;
            uniform float uSaturation;            
            void main(void) {
                vec4 finalColor = texture2D(uDiffuseTexture, vTexcoord );
             
                float angle = uHue * 3.14159265;
                float s = sin(angle), c = cos(angle);
                vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
                float len = length(finalColor.rgb);
                finalColor.rgb = vec3(
                    dot(finalColor.rgb, weights.xyz),
                    dot(finalColor.rgb, weights.zxy),
                    dot(finalColor.rgb, weights.yzx)
                );
                
             
                float average = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
                if (uSaturation > 0.0) {
                    finalColor.rgb += (average - finalColor.rgb) * (1.0 - 1.0 / (1.001 - uSaturation));
                } else {
                    finalColor.rgb += (average - finalColor.rgb) * (-uSaturation);
                }                
                gl_FragColor = finalColor;
                    
            }
            */
        }
        vSource = RedGLUtil.getStrFromComment(vSource.toString());
        fSource = RedGLUtil.getStrFromComment(fSource.toString());
        PROGRAM_NAME = 'RedPostEffect_HueSaturation_Program';
        return function (target, redGL) {
            return target['checkProgram'](redGL, PROGRAM_NAME, vSource, fSource)

        }
    })();
    RedPostEffect_HueSaturation.prototype = RedBaseMaterial.prototype
    RedPostEffect_HueSaturation['NORMAL'] = [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ]
    RedPostEffect_HueSaturation['SHARPEN'] = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0

    ]
    RedPostEffect_HueSaturation['BLUR'] = [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ]
    RedPostEffect_HueSaturation['EDGE'] = [
        0, 1, 0,
        1, -4, 1,
        0, 1, 0
    ]
    RedPostEffect_HueSaturation['EMBOSS'] = [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
    Object.freeze(RedPostEffect_HueSaturation)
})();