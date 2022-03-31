const fileService=require('./fileService');
module.exports={
    isLogged:async (req,res,next)=>{
        try{    
            const session=req.session;
            if(session.user!=null) next();
            else throw Error('401 | Você não está logado')
        }
        catch(err){    
            res.render('error.ejs',{error:err})
        }
    },
    isAdmin:async (req,res,next)=>{
        try{
           const user=req.session.user
           if(user.role=='admin') next();
           else throw Error('401 | Você não tem Autorização') 
        }
        catch(err){
            res.render('error.ejs',{error:err})
        }
    },
    disableCache:(req,res,next)=>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}