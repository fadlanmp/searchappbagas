const connection = require('../connection/searchappConnection');
const Format = require('../tools/format');

module.exports = { 
    getApp: async(req, res)=>{
        try{
            console.log("function starting")
            // Query data dari repo
            let sapp = await connection.getApp(req.query);
            if(!sapp.bindings.length){
                return res.status(200).json({
                    data:[],
                    message: "Data aplikasi tidak ditemukan"
                });
            }
        
            sapp = sapp.bindings.map((aplikasi)=>Format(aplikasi));
            if(req.params.id){
                let aplikasi = sapp.filter((aplikasi)=>{
                    return aplikasi.id == req.params.id
                });
                res.status(200).json({
                    data:aplikasi[0],
                    message: aplikasi.length ? 'Data aplikasi berhasil didapatkan' : 'Tidak ada hasil dari pencarian'
                })
            }else{
                res.status(200).json({
                    data: sapp,
                    message: "Tampilkan semua aplikasi"
                })
            }
        }catch(err){
            res.status(400).json(err);
        }
    },

    getPlatform: async (req, res) => {
        try {
            let platform = await connection.getPlatformApp(req.query);

            if (!platform.bindings.length) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: [],
                    message: 'Data platform tidak ditemukan'
                })
            }

            platform = platform.bindings.map((platform) => formatPlatform(platform));

            return res.status(200).json({
                success: true,
                status: 200,
                data: platform,
                message: 'Data semua platform berhasil didapatkan'
            });
            
        } catch (err) {
            return res.status(200).json({
                success: false,
                status: 200,
                data: '',
                message: `Error: ${err.message}`
            })
        }
    },

    getAppByPlatform: async (req, res) => {
        try {
            let apps = await connection.getAppByPlatform(req.params);

            if (!apps.bindings.length) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: [],
                    message: 'Data aplikasi tidak ditemukan'
                })
            }

            apps = apps.bindings.map((apps) => Format(aplikasi));

            return res.status(200).json({
                success: true,
                status: 200,
                data: reviews,
                message: 'Data semua aplikasi berhasil didapatkan'
            });
            
        } catch (err) {
            return res.status(200).json({
                success: false,
                status: 200,
                data: '',
                message: `Error: ${err.message}`
            })
        }
    }
}