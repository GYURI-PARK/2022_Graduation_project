const client = require('./connection.js');
const Query = require('pg').Query;
const express = require('express');
const app = express();

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})

// client.connect();

app.get('/tree', (req, res) => {
    var startLat = req.query.startLat;
    var startLng = req.query.startLng;
    var endLat = req.query.endLat;
    var endLng = req.query.endLng;
    var lines = [];
    var results = [];

    console.log("startPoint : (" + startLat + ", " + startLng + ")\n");
    console.log("endPoint : (" + endLat + ", " + endLng + ")\n");

    client.connect((err) => {
        if (err) {
            console.log('Error:(' + err)
        } else {
            const sQuery = new Query("SELECT walk_node.node_id, walk_node.geom, walk_node.geom <-> 'SRID=4326;POINT(" + startLng + " " + startLat + ")'::geometry AS dist FROM walk_node ORDER BY dist LIMIT 1;");
            const eQuery = new Query("SELECT walk_node.node_id, walk_node.geom, walk_node.geom <-> 'SRID=4326;POINT(" + endLng + " " + endLat + ")'::geometry AS dist FROM walk_node ORDER BY dist LIMIT 1;");
            var lQueryString = "";
            var start_node_id = 0;
            var end_node_id = 0;

            var rows = [];

            client.query(sQuery, (err, result) => {
                if (!err) {
                    start_node_id = result.rows[0].node_id;
                } else {
                    console.log(err);
                }
            })
            client.query(eQuery, (err, result) => {
                if (!err) {
                    end_node_id = result.rows[0].node_id;
                    console.log("start_node_id : " + start_node_id);
                    console.log("end_node_id : " + end_node_id);
                    lQueryString = "SELECT y.link_wtk FROM pgr_dijkstra('SELECT CAST(link_id as bigint) as id, CAST(f_node as bigint) as source, CAST(t_node as bigint) as target, cost as cost from gvi', " + start_node_id + ", " + end_node_id + ", FALSE) as x  join gvi as y on x.edge = y.link_id order by seq";

                    const lQuery = new Query(lQueryString);
                    client.query(lQuery, (err, result) => {
                        if (!err) {
                            const lines123 = await Promise.all(
                                result.rows.map((item) => {
                                    return (item["link_wtk"])
                                })
                            );

                            const result123 = await Promise.all(
                                lines123.map((line) => {
                                    var spot1 = line.split("(")[1].split(")")[0].split(",")[0].split(" ");
                                    var spot2 = line.split("(")[1].split(")")[0].split(",")[1].split(" ");
                                    results.push(spot1);
                                    results.push(spot2);
                                })
                            );
                            console.log("result : ", result123);





                        } else {
                            console.log(err);
                        }
                    });
                    
                } else {
                    console.log(err);
                }
            });




        }
    })
});

