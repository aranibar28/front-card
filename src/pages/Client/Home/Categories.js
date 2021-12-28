import React, { useEffect } from "react";
import { useCategory } from "../../../hooks";
import { HomeCategories } from "../../../components/Home";

export function Categories() {
  const { categories, getCategories } = useCategory();
  useEffect(() => getCategories(), []); // eslint-disable-line

  return <HomeCategories categories={categories} />;
}
