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
                    // result.rows.map((item) => {
                    //     console.log("sky : "+ item);
                    // })
                    res.status(200).json(result.rows);
                }) // your callback here
                .catch(e => {
                    console.error(e.stack)
                    a.release();
                }) // your callback here
        })

});

app.get('/quiet', (req, res) => {
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
                .query("SELECT link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from quiet', (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry LIMIT 1), (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry LIMIT 1), FALSE) as x join quiet as y on x.edge = y.link_id order by seq") // your query string here
                .then(result => {
                    a.release();
                    // result.rows.map((item) => {
                    //     console.log("quiet : "+ item);
                    // })
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
                .query("SELECT link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from safe', (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry LIMIT 1), (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry LIMIT 1), FALSE) as x join safe as y on x.edge = y.link_id order by seq") // your query string here
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

app.get('/customized', (req, res) => {
    var startLat = req.query.startLat;
    var startLng = req.query.startLng;
    var endLat = req.query.endLat;
    var endLng = req.query.endLng;
    var tables = req.query.tables;

    var red = ["", "", "", ""];
    red[0] = tables.split("*")[0];
    red[1] = tables.split("*")[1];
    red[2] = tables.split("*")[2];
    red[3] = tables.split("*")[3];

    console.log("startPoint : (" + startLat + ", " + startLng + ")\n");
    console.log("endPoint : (" + endLat + ", " + endLng + ")\n");

    red.forEach(element => {
        console.log(element);
    });

    // create table
    const text = "\
    UPDATE custom SET cost = y.cost FROM (SELECT custom.link_id, x.cost FROM custom INNER JOIN (SELECT b.link_id as link_id, (b.s_value*0.5208+c.s_value*0.2708+d.s_value*0.1458+e.s_value*0.0625) as cost FROM " + red[0] +  " as b, " + red[1] + " as c, " + red[2] + " as d, " + red[3] + " as e WHERE b.link_id = c.link_id AND b.link_id = d.link_id AND b.link_id=e.link_id AND c.link_id = d.link_id AND c.link_id = e.link_id AND d.link_id = e.link_id) as x on x.link_id = custom.link_id) as y where custom.link_id = y.link_id;SELECT link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from custom', (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry LIMIT 1), (SELECT walk_node.node_id FROM walk_node ORDER BY  walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry LIMIT 1), FALSE) as x join custom as y on x.edge = y.link_id order by seq"


    client
        .connect()
        .then(a => {
            return a
                .query(text) // your query string here
                .then(result => {
                    console.log("table 생성");
                    a.release();
                    console.log(result);
                    res.status(200).json(result[1].rows);
                    
                }) // your callback here
                .catch(e => {
                    console.error(e.stack);
                    a.release();
                }) // your callback here
        })

});

