// in books.js
import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
// import PostI from '@material-ui/icons/Post';
// export const BookIcon = BookIcon;

export const BookList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="_id" />
            <TextField source="name" />
            <TextField source="image" />
            <TextField source="description" />
            <TextField source="price" />
            <EditButton />
        </Datagrid>
    </List>
);

const BookTitle = ({ record }) => {
    return <span>Book {record ? `"${record.title}"` : ''}</span>;
};

export const BookEdit = (props) => (
    <Edit title={<BookTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="_id" />
            <TextField source="name" />
            <TextField source="image" />
            <TextField source="description" />
            <TextField source="price" />
        </SimpleForm>
    </Edit>
);

export const BookCreate = (props) => (
    <Create title="Add a product" {...props}>
        <SimpleForm>
            <TextField source="name" />
            <TextField source="image" />
            <TextField source="description" />
            <TextField source="price" />
        </SimpleForm>
    </Create>
);