/**
 *  读取file文件渲染至img
 *  @param  {String}    fileElem                    -   file input框的class,id
 *  @param  {String}    imgElem                     -   imgElem的class,id
 *  @param  {Number}    [limitSize=6MB] limitSize   -   限制文件大小 kb 需要*1024
 *  @param  {Function}  cb                          -   执行成功后的回调函数
 */
export default function (fileElem,imgElem,limitSize=(6*1024*1024),cb) {

    let __alert=function (obj) {
        window.alert(`${obj.text}`);
    };

    let swal=window.swal?window.swal:__alert;

    $(fileElem).on('change',function(e){
        var file = this.files[0];
        var imageType = /^image\//;

        console.log("this.files",this.files);
        if ( !imageType.test(file.type) ) {
            // alert('请选择图片文件');
            swal({
                title: "提示",
                text: "请选择图片文件！",
                timer: 2000,
                showConfirmButton: false
            });
            return false;
        }
        if(file.size>=limitSize){
            // alert('请选择小于1M的图片');
            swal({
                title: "提示",
                text: "请选择小于1M的图片！",
                timer: 2000,
                showConfirmButton: false
            });
            return false;
        }

        var reader = new FileReader();
        reader.onload = function(e) {

            if($(imgElem).length>0){
                $(imgElem).attr('src',e.target.result);
            }

            if(cb){
                cb(file,e);
            }
        };
        reader.readAsDataURL(file);

    });
}