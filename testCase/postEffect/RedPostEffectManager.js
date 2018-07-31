"use strict";
RedGL(document.createElement('canvas'), function (v) {
	var tRedGL = this;
	var tGL = tRedGL.gl
	redSuite(
		"RedPostEffectManager 테스트",
		redGroup(
			"RedPostEffectManager( redGL )",
			redTest("성공테스트 : RedGL Instance만 허용", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(tRedGL)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("실패테스트 : RedGL Instance만 허용", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(1)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : RedScene Instance 생성시 postEffectManager속성에 RedPostEffectManager Instance가 생김", function (unit, title) {
				var t0 = RedView('test', tRedGL, RedScene(tRedGL), RedCamera())
				unit.run(t0['postEffectManager'] instanceof RedPostEffectManager)
			}, true)
		),
		redGroup(
			"설정불가 속성 확인 : frameBuffer / finalMaterial / postEffectList / children",
			redTest("실패테스트 : frameBuffer", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				try {
					t0.frameBuffer = 'failTest'
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : finalMaterial", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				try {
					t0.finalMaterial = 'failTest'
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : postEffectList", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				try {
					t0.postEffectList = 'failTest'
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("실패테스트 : children", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				try {
					t0.children = 'failTest'
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false)
		),
		redGroup(
			"(RedPostEffectManager Instance).<b>addEffect</b>( effect )",
			redTest("실패테스트 : 미입력", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				try {
					t0.addEffect(null)
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : RedBasePostEffect 확장 인스턴스 입력", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				unit.run(t0['postEffectList'][0] == tEffect0)
			}, true),
			redTest("실패테스트 : 문자입력", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				try {
					t0.addEffect('failTest')
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : 추가후 postEffectList.length 정상적으로 늘어나는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				unit.run(t0['postEffectList'].length)
			}, 2)
		),
		redGroup(
			"(RedPostEffectManager Instance).<b>removeEffect</b>( effect )",
			redTest("성공테스트 : 동작 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				t0.removeEffect(tEffect0)
				unit.run(t0['postEffectList'].length)
			}, 0),
			redTest("성공테스트 : 미입력", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				try {
					t0.removeEffect()
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, true),
			redTest("성공테스트 : postEffectList에 없는 녀석을 제거하면", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				t0.removeEffect(RedPostEffect_Gray(tRedGL))
				console.log('///////////////////////////////////////////////////////////')
				console.log(title, '\n', t0)
				unit.run(t0['postEffectList'].length)
			}, 1)
		),
		redGroup(
			"(RedPostEffectManager Instance).<b>removeAllEffect</b>()",
			redTest("동작 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_Gray(tRedGL);
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				t0.addEffect(tEffect0)
				console.log(t0['postEffectList'].length)
				t0.removeAllEffect()
				unit.run(t0['postEffectList'].length)
			}, 0)
		),
		redGroup(
			"(RedPostEffectManager Instance).<b>antialiasing</b> = value",
			redTest("성공테스트 : antialiasing 설정확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				var tEffect0 = RedPostEffect_FXAA(tRedGL);
				t0['antialiasing'] = tEffect0
				unit.run(t0['antialiasing'] == tEffect0)
			}, true),
			redTest("실패테스트 : RedPostEffect_FXAA Instance 만 허용", function (unit, title) {
				try {
					var t0 = RedPostEffectManager(tRedGL);
					t0['antialiasing'] = 1
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', t0)
					unit.run(true)
				} catch ( error ) {
					console.log('///////////////////////////////////////////////////////////')
					console.log(title, '\n', error)
					unit.run(false)
				}
			}, false),
			redTest("성공테스트 : null 설정확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL);
				t0['antialiasing'] = null
				unit.run(t0['antialiasing'])
			}, null)
		),
		redGroup(
			"webglFrameBuffer : (RedPostEffectManager Instance).<b>bind</b>( gl ) / (RedPostEffectManager Instance).<b>unbind</b>( gl )",
			redTest("성공테스트 : bind - 소유하고있는 webglFrameBuffer가 등록되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.FRAMEBUFFER_BINDING))
				unit.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) == t0['frameBuffer']['webglFrameBuffer'])
				t0.unbind(tGL)
			}, true),
			redTest("성공테스트 : unbind - webglFrameBuffer가 unbind 되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				t0.unbind(tGL)
				unit.run(tGL.getParameter(tGL.FRAMEBUFFER_BINDING) == t0['frameBuffer']['webglFrameBuffer'])
			}, false)
		),
		redGroup(
			"webglTexture : (RedPostEffectManager Instance).<b>bind</b>( gl ) / (RedPostEffectManager Instance).<b>unbind</b>( gl )",
			redTest("성공테스트 : bind - 소유하고있는 webglTexture가 등록되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['frameBuffer']['texture']['webglTexture'])
				unit.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['frameBuffer']['texture']['webglTexture'])
				t0.unbind(tGL)
			}, true),
			redTest("성공테스트 : unbind - 소유하고있는 webglTexture가 unbind 되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				t0.unbind(tGL)
				console.log(t0['frameBuffer']['texture']['webglTexture'])
				unit.run(tGL.getParameter(tGL.TEXTURE_BINDING_2D) == t0['frameBuffer']['texture']['webglTexture'])
			}, false)
		),
		redGroup(
			"webglRenderBuffer : (RedPostEffectManager Instance).<b>bind</b>( gl ) / (RedPostEffectManager Instance).<b>unbind</b>( gl )",
			redTest("성공테스트 : bind - 소유하고있는 webglRenderBuffer가 등록되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING))
				unit.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) == t0['frameBuffer']['webglRenderBuffer'])
				t0.unbind(tGL)
			}, true),
			redTest("unbind - unbind시 소유하고있는 webglRenderBuffer가 unbind 되는지 확인", function (unit, title) {
				var t0 = RedPostEffectManager(tRedGL)
				t0.bind(tGL)
				console.log(tGL.getParameter(tGL.RENDERBUFFER_BINDING))
				t0.unbind(tGL)
				unit.run(tGL.getParameter(tGL.RENDERBUFFER_BINDING) == t0['frameBuffer']['webglRenderBuffer'])
			}, false)
		)
	)
})
