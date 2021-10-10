import { VFC, memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editBrand, selectBrand } from "../features/vehicleSlice";
import { useMutateBrands } from "../reactQueryHooks/useBrandMutations";
import { useQueryBrands } from "../reactQueryHooks/useBrandQuery";
import styles from "./Brand.module.css";

export const Brand: VFC = memo(() => {
  const dispatch = useAppDispatch();
  const editedBrand = useAppSelector(selectBrand);
  const { data, status } = useQueryBrands();
  console.log("rendered Brand")
  const { createBrandMutation, updateBrandMutation, deleteBrandMutation } =
    useMutateBrands();

  const submitBrand =
    editedBrand.id === 0
      ? () => {
          createBrandMutation.mutate({ brand_name: editedBrand.brand_name });
          dispatch(editBrand({ id: 0, brand_name: "" }));
        }
      : () => {
          updateBrandMutation.mutate(editedBrand);
          dispatch(editBrand({ id: 0, brand_name: "" }));
        };
  if (status === "loading") return <div>{"Loading..."}</div>;
  if (status === "error") return <div>{"Error"}</div>;
  return (
    <>
      <h3 data-testid="h3-brand">Brand</h3>
      <div>
        <input
          type="text"
          placeholder="new brand name"
          value={editedBrand.brand_name}
          onChange={(e) =>
            dispatch(editBrand({ ...editedBrand, brand_name: e.target.value }))
          }
        />
        <button onClick={submitBrand} disabled={!editedBrand.brand_name}>
          {editedBrand.id === 0 ? "Create" : "Update"}
        </button>
        <ul>
          {data?.map((brand) => (
            <li className={styles.brand__item} key={brand.id}>
              <span data-testid={`list-${brand.id}`}>{brand.brand_name}</span>
              <div>
                <button onClick={() => deleteBrandMutation.mutate(brand.id!)}>
                  delete
                </button>
                <button
                  data-testid={`edit-brand-${brand.id}`}
                  onClick={() => {
                    dispatch(editBrand(brand));
                  }}
                >
                  edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});
