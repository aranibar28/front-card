import React, { useState, useEffect, useCallback } from "react";
import { Form, Image, Button, Dropdown, Checkbox } from "semantic-ui-react";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory, useProduct } from "../../../../hooks";
import "./AddEditProductForm.scss";
import Swal from "sweetalert2";

export function AddEditProductForm(props) {
  const { onClose, onRefetch, product } = props;
  const { categories, getCategories } = useCategory();
  const { addProduct, updateProduct } = useProduct();
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [previewImage, setPreviewImage] = useState(product?.image || null);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setDisabled(true);
      if (product) await updateProduct(product.id, formValue);
      else await addProduct(formValue);
      onRefetch();
      onClose();
      Swal.fire("Completado!", "Se guardaron los cambios.", "success");
    },
  });

  useEffect(() => getCategories(), []); // eslint-disable-line

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []); // eslint-disable-line

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Form.Input
        name="description"
        placeholder="Descripción"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />
      <Dropdown
        placeholder="Categoría"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />
      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Producto Activo
      </div>
      <Button
        type="button"
        fluid
        color={formik.errors.image && "red"}
        {...getRootProps()}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />
      <Button
        disabled={disabled}
        type="submit"
        primary
        fluid
        content={product ? "Actualizar" : "Registrar"}
      />
    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    description: Yup.string(),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    description: Yup.string(),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  };
}
