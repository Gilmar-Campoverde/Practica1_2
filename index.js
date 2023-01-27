
const morgan=require('morgan');
const express=require('express'); 
const app=express();

app.use(morgan('combined'));
function logger(req,res,next){
    console.log('Ruta Recibida '+ req.protocol+'://'+req.get('host')+ req.originalUrl);
    next();
 }
 app.use(logger);

app.get('/misitio', (req,res)=>{ 
    res.send('Bienvenido a mi sitio web');
});
app.get('/misitio/gastos', (req,res)=>{
    res.json(
    {
    gasto:'Salud',
    monto:14575.60,
    informacion:'Corresponde a consultas médicas, pagos de seguros, medicinas'
    })
});

app.post('/misitio/calculo', (req,res)=>{
    console.log(req.body); 
    res.send('Cálculo impuesto a la renta');
});
app.post('/misitio/usuario/:id',(req, res)=>{ 
    console.log(req.body); 
    console.log(req.params); 
    res.send('Usuario nuevo registrado');
})

app.get('/misitio/about', (req,res)=>{ 
    res.send('<h1>Acerca de nosotros</h1>');
});

app.put('/misitio/calculo', (req,res)=>{
    console.log(req.body); 
    res.send('Cálculo impuesto a la renta');
});


app.delete('/misitio/usuario/:id', (req,res)=>{ 
    res.send('Usuario '+ (req.params.id) +' borrado');
});

//app.use(express.static('public'));
app.set('nombreApp','Aplicacion para manejo de gastos SRI');
console.log(app.get('nombreApp'));
app.set('puerto',3000);

app.listen(app.get('puerto'), ()=>{
    console.log('Nombre de la App',app.get('nombreApp')); 
    console.log('Puerto del servidor',app.get('puerto'));
})

app.use(express.static('views'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{ 
    res.render('index.ejs');
})