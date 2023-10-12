import express, { response } from 'express';
import mysql from 'mysql';

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "todo_list"
})

app.post('/Tasks', (req,res) => {
    try
    {
    const task = req.body.task;
    db.query(
        "INSERT INTO task_details (task,task_date,task_time) VALUES(?, CURRENT_DATE(), CURRENT_TIME())",
        [task], 
        (err,result) => {
            if(err)
            {
                console.log(err);
            }
            else{
                res.send("Task added successfully !")
            }
    })
    }
    catch(error)
    {
        response.send({message:error.message});
    }
 })

 app.get('/Tasks', (req, res) => {

    db.query(
        "SELECT * FROM task_details",
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("An error occurred while adding the task.");
            } else {
                res.json(result);
            }
        }
    );
});

 app.delete('/Tasks/:id', (req,res) => {
    const { id } = req.params;
 
    db.query(
        "DELETE FROM task_details WHERE id = ?",
        [id], 
        (err,result) => {
            if(err)
            {
                console.log(err);
            }
            else{
                res.send("Task deleted")
            }
    })
 })

 app.put('/Tasks/:id', (req,res) => {
    const { id } = req.params;
    const updatedTask = req.body.task;
    db.query('UPDATE task_details SET task = ? WHERE id = ?',
    [updatedTask,id],
    (err,result) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred while updating the task.");
        } else {
            res.send("Task updated successfully!");
        }
    })
 })

 app.put('/Tasks/completedtask/:id', (req, res) => {
    const { id } = req.params;
    const num = 1;

    db.query('UPDATE task_details SET completed_status = ? WHERE id = ?',
        [num, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err.message });
            } else {
                console.log('Task Completed');
                res.send("Task Completed");
            }
        });
});


app.listen(3001, () => {
    console.log("Listening to the port!")
})