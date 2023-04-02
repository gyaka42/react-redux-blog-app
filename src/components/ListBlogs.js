import React from "react";

import styles from "../assets/css/listBlogs.module.css";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListBlogs = () => {
  const navigate = useNavigate();
  const { blogsState, categoriesState, usersState, loginState } = useSelector(
    (state) => state
  );
  let blogs = [];
  if (loginState?.user?.role === "admin") {
    blogs = blogsState?.blogs;
  } else {
    blogs = blogsState?.blogs?.filter(
      (item) => item?.userId === loginState?.user?.userId
    );
  }
  return (
    <div className={`${styles.listBlogsWrapper} ${styles.shadow}`}>
      <div className={styles.btnWrapper}>
        <Button onClick={() => navigate("/admin/add-blog")} variant="primary">
          Blog Ekle
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Sıra No</th>
            <th>Başlık</th>
            <th>Kategori</th>
            <th>Yazar</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog, index) => {
            const category = categoriesState?.categories?.find(
              (item) => item.id === blog?.categoryId
            );
            const user = usersState?.users?.find(
              (item) => item?.id === blog?.userId
            );
            return (
              <tr key={blog?.id}>
                <td>{index + 1}</td>
                <td>{blog?.title}</td>
                <td>{category?.name}</td>
                <td>{user?.username}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListBlogs;
