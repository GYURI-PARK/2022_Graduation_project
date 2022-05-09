const client = require('./connection.js');
const Query = require('pg').Query;
const express = require('express');
const cors = require('cors');
const app = express();

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})

app.use(cors({
    origin: "*",
}));

app.get('/tree', (req, res) => {
    var startLat = req.query.startLat;
    var startLng = req.query.startLng;
    var endLat = req.query.endLat;
    var endLng = req.query.endLng;

    console.log("startPoint : (" + startLat + ", " + startLng + ")\n");
    console.log("endPoint : (" + endLat + ", " + endLng + ")\n");

    client
        .connect()
        .then(a => {
            return a
                .query("SELECT link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from gvi', (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry LIMIT 1), (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry LIMIT 1), FALSE) as x join gvi as y on x.edge = y.link_id order by seq") // your query string here
                .then(result => {
                    a.release();
                    res.status(200).json(result.rows);
                }) // your callback here
                .catch(e => {
                    console.error(e.stack)
                    a.release();
                }) // your callback here
        })

});

app.get('/sky', (req, res) => {
    var startLat = req.query.startLat;
    var startLng = req.query.startLng;
    var endLat = req.query.endLat;
    var endLng = req.query.endLng;

    console.log("startPoint : (" + startLat + ", " + startLng + ")\n");
    console.log("endPoint : (" + endLat + ", " + endLng + ")\n");

    client
        .connect()
        .then(a => {
            return a
                .query("SELECT link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from svf', (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry LIMIT 1), (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry LIMIT 1), FALSE) as x join svf as y on x.edge = y.link_id order by seq") // your query string here
                .then(result => {
                    a.release();
                    res.status(200).json(result.rows);
                }) // your callback here
                .catch(e => {
                    console.error(e.stack)
                    a.release();
                }) // your callback here
        })

});

app.get('/quite', (req, res) => {
    var startLat = req.query.startLat;
    var startLng = req.query.startLng;
    var endLat = req.query.endLat;
    var endLng = req.query.endLng;

    console.log("startPoint : (" + startLat + ", " + startLng + ")\n");
    console.log("endPoint : (" + endLat + ", " + endLng + ")\n");

    client
        .connect()
        .then(a => {
            return a
                .query("SELECT link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from road_noise', (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry LIMIT 1), (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry LIMIT 1), FALSE) as x join road_noise as y on x.edge = y.link_id order by seq") // your query string here
                .then(result => {
                    a.release();
                    res.status(200).json(result.rows);
                }) // your callback here
                .catch(e => {
                    console.error(e.stack)
                    a.release();
                }) // your callback here
        })

});

app.get('/safe', (req, res) => {
    var startLat = req.query.startLat;
    var startLng = req.query.startLng;
    var endLat = req.query.endLat;
    var endLng = req.query.endLng;

    console.log("startPoint : (" + startLat + ", " + startLng + ")\n");
    console.log("endPoint : (" + endLat + ", " + endLng + ")\n");

    client
        .connect()
        .then(a => {
            return a
                .query("SELECT link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from road', (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry LIMIT 1), (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry LIMIT 1), FALSE) as x join road as y on x.edge = y.link_id order by seq") // your query string here
                .then(result => {
                    a.release();
                    res.status(200).json(result.rows);
                }) // your callback here
                .catch(e => {
                    console.error(e.stack)
                    a.release();
                }) // your callback here
        })

});

