app.post("/students", (request, res) => {
  console.log(request.body);
  const user = new Student(request.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
  // await res.send("app js called...");
});
