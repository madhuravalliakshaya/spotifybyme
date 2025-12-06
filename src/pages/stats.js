import { Table, Button, Modal, Input, Form } from 'antd';
import { useState } from 'react';

const initialMovies = [
  { key: 1, title: 'Avengers', genre: 'Action', duration: 180 },
  { key: 2, title: 'Inception', genre: 'Sci-Fi', duration: 150 },
];

export default function MoviesTable() {
  const [movies, setMovies] = useState(initialMovies);
  const [editingMovie, setEditingMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Genre', dataIndex: 'genre', key: 'genre' },
    { title: 'Duration (min)', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => editMovie(record)} type="link">Edit</Button>
          <Button onClick={() => deleteMovie(record.key)} type="link" danger>Delete</Button>
        </>
      ),
    },
  ];

  const editMovie = (movie) => {
    setEditingMovie(movie);
    form.setFieldsValue(movie);
    setIsModalOpen(true);
  };

  const deleteMovie = (key) => {
    setMovies(movies.filter(m => m.key !== key));
  };

  const openAddModal = () => {
    setEditingMovie(null);       
    form.resetFields();        
    setIsModalOpen(true);
  };

  const handleSave = (values) => {
    if (editingMovie) {
      setMovies(movies.map(m => m.key === editingMovie.key ? { ...m, ...values } : m));
    } else {
      setMovies([...movies, { key: movies.length + 1, ...values }]);
    }
    setIsModalOpen(false);
    setEditingMovie(null);
    form.resetFields(); 
  };

  return (
    <div>
      <Button onClick={openAddModal} type="primary" style={{ marginBottom: 16 }}>
        Add Movie
      </Button>
      <Table columns={columns} dataSource={movies} pagination={{ pageSize: 5 }} />

      <Modal
        title={editingMovie ? 'Edit Movie' : 'Add Movie'}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); form.resetFields(); }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="duration" label="Duration (min)" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingMovie ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
