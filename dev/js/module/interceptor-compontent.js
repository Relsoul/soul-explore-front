
export default class InterceptorCompontent{

    /**
     *
     * @param $                 jQuery
     * @param allCompontents    原有组件列表
     */
    constructor($,allCompontents={}){
        this.allCompontents=allCompontents;
        this.$=$;
        this.interceptorList={};

        //转换单个func为array
        if(this.allCompontents){
            for (let item of Object.keys(this.allCompontents)){
                if(item){
                    if(!this.$.isArray(this.allCompontents[item])){
                        this.allCompontents[item]=[this.allCompontents[item]];
                    }
                }
            }
        }
    }
    
    __isExistCompontent(elem){
        return this.$(elem).length>0?true:false;
    }

    /**
     *
     * @param obj           需要添加数据的对象
     * @param name          数据的key
     * @param data          数据的data
     * @param customName    是否以对象的形式来添加组件
     * @private
     */
    __addFunc(obj,name,data,customName){
        let current=obj[name];

        //是否存在当前有对应的component
        if(current){

            if(!customName){
                //数组的形式添加

                if(!this.$.isArray(current)) {
                    //当前对应的component函数不为数组

                    obj[name] = [current];
                    //添加新的component执行函数
                    obj[name].push(data);

                }else if(this.$.isArray(current)){
                    //当前对应的component函数为数组

                    obj[name].push(data);
                }
            }else{
                //对象的形式添加

                if(!this.$.isArray(current)&&typeof current =='object') {
                    //当前对应的component函数为对象

                    if(obj[name][customName]){
                        //如果已经存在当前自定义名称则扩展对象
                        Object.assign(obj[name][customName],data);
                    }else{
                        obj[name] ={
                            [customName]:data
                        };
                    }

                }else if(this.$.isArray(current)){
                    //当前对应的component函数为数组

                    obj[name].push(data);
                }

            }


        }else{

            if(!customName){
                //不存在对应的component
                obj[name] = [];
                //添加新的component执行函数
                obj[name].push(data);
            }else{
                obj[name] ={
                    [customName]:data
                };
            }
        }
    }

    /**
     *
     * @param name  组件名
     * @param func  组件执行函数
     */
    addCompontents(name,func){

        this.__addFunc(this.allCompontents,name,func);
    }


    /**
     * 添加拦截器
     * @param   {String}  customName    自定义名
     * @param   {String}  key           组件名
     * @param   {Object}  data          必须为对象
     *
     */
    addInterceptor(customName,key,data){

        if(!customName||!key||!data){
            throw new Error(`必须传递 customName,key,data`);
            return false;
        }

        this.__addFunc(this.interceptorList,key,data,customName);
    }

    init(){
        for(let item of Object.keys(this.allCompontents)){
            if(this.__isExistCompontent(`${item}`)){
                //alert(`执行:${item}`,)

                for(let func of this.allCompontents[item]){

                    //是否存在注入器
                    if(this.interceptorList[item]){
                        func(this.interceptorList[item]);
                    }else{
                        func();
                    }
                }
            }
        }
    }
}