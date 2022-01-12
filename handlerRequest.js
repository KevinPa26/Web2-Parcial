const fs = require('fs');
const pug = require('pug');
const mysql = require('mysql2');
const formi = require('formidable');
const config = require('./config.js');

const con = mysql.createConnection(config);
let contador = 0;

function modificarPersona(req, res){
    let personas = [];
    const sql = "SELECT * FROM persona"
    con.connect();
    con.query(sql, (err, result, fields)=>{
        if(err){
            const html = pug.renderFile('./vistas/modificarPersona.pug',{
                personas:personas,
                pretty:true
            });
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(html);
            res.end();
        }else{
            for(let i = 0; i < result.length; i++){
                personas.push(result[i]);
            }
        }

        const html = pug.renderFile('./vistas/modificarPersona.pug',{
            personas:personas,
            pretty:true
        });
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(html);
        res.end();
    })
}

function modificar(req, res){
    let arc;
    const form = formi.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        console.log(fields);
        if(fields.dni.length != 0 && fields.nombre != 0 && fields.apellido.length != 0 && fields.email.length != 0){
            if(arc.length != 0){
                let sql = `UPDATE persona SET dni=?,nombre=?, apellido=?,mail=?,fechaActual=?,foto=? WHERE dni=?`;
                con.connect();
                con.query(sql,[fields.dni,fields.nombre,fields.apellido,fields.email,fields.fecha,`./fotos/${arc}`,fields.dnifijo], (err, result)=>{
                    if(err){
                        resultado(req, res, true, false);
                    }else if(result.affectedRows == 1){
                        resultado(req, res, false, true);
                    }
                })
            }else{
                let sql = `UPDATE persona SET dni=?,nombre=?, apellido=?,mail=?,fechaActual=? WHERE dni=?`;
                con.connect();
                con.query(sql,[fields.dni,fields.nombre,fields.apellido,fields.email,fields.fecha,fields.dnifijo], (err, result)=>{
                    if(err){
                        resultado(req, res, true, false);
                    }else if(result.affectedRows == 1){
                        resultado(req, res, false, true);
                    }
                })
            }

        }else{
            resultado(req, res, true, false);
        }
    });

    form.on("fileBegin", (filename, file)=>{
        if(file.name == ""){
            arc = "";
        }else{
            file.path = "./fotos/"+ contador + file.name;
            arc = contador + file.name;
            contador++;
        }
    });
}

function resultado(req, res, a, b){
    const html = pug.renderFile('./vistas/resultado.pug',{
        error1:a,
        error2:b,
        pretty:true
    });
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(html);
    res.end();
}



exports.modificarPersona = modificarPersona;
exports.modificar = modificar;
exports.resultado = resultado;