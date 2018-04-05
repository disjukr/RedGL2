"use strict";
var RedAxis;
(function () {
    RedAxis = function (redGL) {
        if (!(this instanceof RedAxis)) return new RedAxis(redGL);
        if (!(redGL instanceof RedGL)) RedGLUtil.throwFunc('RedAxis : RedGL Instance만 허용됩니다.')
        var root;
        var xAxis, yAxis, zAxis;
        RedBaseObject3D['build'].call(this, redGL.gl)
        this['children'] = [];
        //
        root = RedMesh(redGL, RedBox(redGL), RedColorMaterial(redGL, '#ff0000'))
        xAxis = RedMesh(redGL, RedBox(redGL), RedColorMaterial(redGL, '#ff0000'))
        xAxis.scaleX = xAxis.scaleY = xAxis.scaleZ = 0.5
        xAxis.scaleX = 10
        root.x = 5
        xAxis.x = -5
        root['children'].push(xAxis)
        this['children'].push(root)
        //
        root = RedMesh(redGL, RedBox(redGL), RedColorMaterial(redGL, '#00ff00'))
        yAxis = RedMesh(redGL, RedBox(redGL), RedColorMaterial(redGL, '#00ff00'))
        yAxis.scaleX = yAxis.scaleY = yAxis.scaleZ = 0.5
        yAxis.scaleY = 10
        root.y = 5
        yAxis.y = -5
        root['children'].push(yAxis)
        this['children'].push(root)
        //
        root = RedMesh(redGL, RedBox(redGL), RedColorMaterial(redGL, '#0000ff'))
        zAxis = RedMesh(redGL, RedBox(redGL), RedColorMaterial(redGL, '#0000ff'))
        zAxis.scaleX = zAxis.scaleY = zAxis.scaleZ = 0.5
        zAxis.scaleZ = 10
        root.z = 5
        zAxis.z = -5
        //
        root['children'].push(zAxis)
        this['children'].push(root)
        //
        this['_UUID'] = RedGL['makeUUID']();
        // Object.seal(this)
    }
    RedGLUtil['extendsProto'](RedAxis, RedBaseContainer);
    RedGLUtil['extendsProto'](RedAxis, RedBaseObject3D);
    Object.freeze(RedAxis);
})();