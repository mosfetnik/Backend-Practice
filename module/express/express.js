"use strict";
const express = require("express");
const fs = require("fs");
const app = express();

//  ! middleware
app.use(express.json());
// ! local data
const users = JSON.parse(fs.readFileSync("../../text/user.json"));

// ! =================================================
const get_all_data = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};
// ! =================================================
const get_one_user = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const user_data = users.find((ele) => ele.id === id);

  if (!user_data) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user_data,
    },
  });
};
// ! =================================================
const create_user = (req, res) => {
  console.log(req.body);
  const new_id = users[users.length - 1].id + 1;
  const new_user = Object.assign({ id: new_id }, req.body);

  users.push(new_user);
  fs.writeFile(
    "../../text/user.json",
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error writing to file",
        });
      }

      res.status(201).json({
        status: "success",
        data: {
          user: new_user,
        },
      });
    }
  );
};
// ! =================================================
const update_user = (req, res) => {
  if (req.params.id * 1 > users.length) {
    res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      users: "<Updated User>",
    },
  });
};
// ! =================================================
const delete_user = (req, res) => {
  if (req.params.id * 1 > users.length) {
    res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

app.route("/api/v1/users").get(get_all_data).post(create_user);
app
  .route("/api/v1/users/:id")
  .get(get_one_user)
  .patch(update_user)
  .delete(delete_user);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
