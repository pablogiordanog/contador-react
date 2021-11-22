/*if ("serviceWorker" in navigator) {
        console.log("Si Existe el Servicio");
}*/
if (navigator.serviceWorker) {
        navigator.serviceWorker.register("./sw.js").then((reg) => {
                console.log("Si Existe el Servicio", reg);
        });
}