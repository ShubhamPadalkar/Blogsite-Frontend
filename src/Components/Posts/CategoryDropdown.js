import React, { useEffect } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesAction } from "../redux/reducers/categorySlice";

const CategoryDropdown = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const category = useSelector((state) => state?.category);
  const { categoryList, loading, appErr, serverErr } = category;

  const allCategories = categoryList ? categoryList.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  }) : [{label:'Loading...',value:0}]
 

  const handleChange = (value) => {
    props.onChange("category", value);
  };

  const handleBlur = () => {
    props.onBlur("category", true);
  };

  return (
    <div style={{margin:'1rem 0'}}>
      {loading  ? (
        <h3 className="text-base text-green-600">
            Product category list are loading please wait...</h3>
      ) : (
        <Select
          id="category"
          onChange={handleChange}
          onBlur={handleBlur}
          options={allCategories}
          value={props?.value?.label}
        />
      )}
      {/* Display */}
      {props?.error &&
       <div style={{color:'red',marginTop:'.5rem'}} >{props?.error}</div>}
    </div>
  );
};

export default CategoryDropdown;
