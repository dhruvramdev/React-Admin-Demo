import React from 'react';
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    DisabledInput,
    TextInput,
    LongTextInput,
    DateInput,
    ReferenceField
} from 'react-admin';
// import PostI from '@material-ui/icons/Post';
// export const ProductIcon = ProductIcon;

export const ProductList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="image"/>
            <TextField source="description"/>
            {/*<TextField source="seller.name"/>*/}
            <ReferenceField label="Seller" source="seller.id" reference="Seller">
                <TextField source="name" />
            </ReferenceField>
            {/*<TextField source="seller.id"/>*/}
            <EditButton/>
        </Datagrid>
    </List>
);

const ProductTitle = ({record}) => {
    return <span>Product {record ? `"${record.title}"` : ''}</span>;
};

export const ProductEdit = (props) => (
    <Edit title={<ProductTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <DisabledInput source="seller.id"/>
            <TextInput source="name"/>
            <TextInput source="image"/>
            <TextInput source="description"/>
            <TextInput source="seller.name"/>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = (props) => (
    <Create title="Create a Product" {...props}>
        <SimpleForm>
        <TextField source="name"/>
            <TextField source="image"/>
            <TextField source="about"/>
        </SimpleForm>
    </Create>
);