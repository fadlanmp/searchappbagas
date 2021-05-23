const connection = require('../connection/searchappConnection');
const Format = require('../tools/format');

module.exports.getApp = async(req, res)=>{
        try{
            console.log("function starting")
            // Query data dari repo
            let sapp = await connection.getApp(req.query);
            if(!sapp.bindings.length){
                return res.status(200).json({
                    data:[],
                    message: "Data tidak ditemukan"
                });
            }
            
            sapp = sapp.bindings.map((aplikasi)=>Format(aplikasi));
            if(req.params.id){
                let aplikasi = sapp.filter((aplikasi)=>{
                    return aplikasi.id == req.params.id
                });
                res.status(200).json({
                    data:aplikasi[0],
                    message: aplikasi.length ? 'Data perangkat berhasil didapatkan' : 'Tidak ada hasil dari pencarian'
                })
            }else{
                res.status(200).json({
                    data: sapp,
                    message: "Show all perangkat"
                })
            }
        }catch(err){
            res.status(400).json(err);
        }
    }