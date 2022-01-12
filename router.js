const fs = require('fs');

function ext(ruta){
    let ext;
    const mime = {
        'html': 'text/html',
        'css': 'text/css',
        'jpg': 'image/jpg',
        'png': 'image/png',
        'ico': 'image/x-icon',
        'mp3': 'audio/mpeg3',
        'mp4': 'video/mp4',
        'js': 'text/javascript',
        'json': 'application/json'
    };
    const vec = ruta.split('.');
    if(vec[vec.length - 1] == 'map'){
        ext = 'js'
    }else{
        ext = vec[vec.length - 1];
    }
    return mime[ext];
}

function route(hadle,pathname,request,response){
    let extn = ext(pathname)
    if(typeof hadle[pathname] === 'function'){
        hadle[pathname](request,response)
    }else{
        pathname = "."+pathname;
        fs.stat(pathname, error =>{
            if(!error){
                fs.readFile(pathname,(err, contenido)=>{
                    if(!err){
                        response.writeHead(200,{'Content-Type':extn});
                        response.write(contenido);
                        response.end();
                    }else{
                        response.writeHead(500,{'Content-Type':'text/plain'});
                        response.write('error interno');
                        response.end();
                    }
                })
            }else{
                console.log(error);
                fs.readFile('./public/404.jpg',(err, contenido)=>{
                    if(!err){
                        response.writeHead(404,{'Content-Type':'image/jpg'});
                        response.write(contenido);
                        response.end();
                    }else{
                        response.writeHead(500,{'Content-Type':'text/plain'});
                        response.write("error interno");
                        response.end();
                    }
                })
            }
        })
    }
}

exports.route = route;