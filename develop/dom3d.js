/**
 * Created by lenrinfvck on 2015-02-27.
 */
(function(){
    var transform = function(element, value, key) {
        key = key || "Transform";
        ["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
            element.style[prefix + key] += ' '+value;
        });
        return element;
    };
    var $ = function(selector){
        var $$ = function(str){
            return document.querySelectorAll(str);
        };
        if($$(selector).length > 1)
            return $$(selector);
        return document.querySelector(selector)
    };
    $.extend = function(obj, parObj){
        for(var n in parObj){
            obj[n] = parObj[n];
        }
    };
    NodeList.prototype.each = function(callback){
        var _this = this;
        console.log(this);
        for(var n in _this){
            if(_this[n].style)
                callback.apply(_this[n],[_this[n],parseInt(n)]);
        }
    };
    var Ntrf3d = function(el,pos){
        this.dom = el;
        this.x = pos[0];
        this.y = pos[1];
        this.z = pos[2];
        this.setPos(this.x, this.y, this.z);
    };
    Ntrf3d.prototype = {
        setPos : function(x, y, z){
            var el = this.dom;
            transform(el, 'translate3d('+x+'px,'+y+'px,'+z+'px)');
        }
    };
    var Camera = function(pos, point){
        var x = pos[0]||0;
        this.y = pos[1]||0;
        this.z = pos[2]||0;
        this.setPos(this.x, this.y, this.z);
    };
    Camera.prototype = {
        setPos : function(x, y, z){
            $('.ntrStage').style.perspective=z+'px';
        }
    };
    console.log($('#div1'),$('#div1').tagName);
    // console.log(document.getElementById('div1'));
    console.log($(".dom3d"),$(".dom3d").length);
    var dom3d = $(".dom3d");
    var d = $('#div1');
    //new Ntrf3d(d,[300,200,10]);
    dom3d.each(function(el,index){
        new Ntrf3d(el,[index*100,index*100,-index*200])
        //transform(el, 'rotateY(45deg)');
    });
    var camera = new Camera([0,0,100]);
    var con = $('#controller button');
    con.addEventListener('click',submit);
    function submit(){
        var x = $('#cX').value;
        var y = $('#cY').value;
        var z = $('#cZ').value;
        console.log(z+'px');
        camera.setPos(x, y, z);
    }
})();