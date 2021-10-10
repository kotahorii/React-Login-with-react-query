import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Brand } from "../types/vehicleTypes";

export const useMutateBrands = () => {
  const queryClient = useQueryClient();

  const createBrandMutation = useMutation(
    (brand: Brand) =>
      axios.post<Brand>(`${process.env.REACT_APP_REST_URL}api/brands`, brand, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.token}`,
        },
      }),
    {
      onSuccess: (res) => {
        const previousBrand = queryClient.getQueryData<Brand[]>("brands");
        if (previousBrand) {
          queryClient.setQueryData<Brand[]>("brands", [
            ...previousBrand,
            res.data,
          ]);
        }
      },
    }
  );
  const updateBrandMutation = useMutation(
    (brand: Brand) =>
      axios.put<Brand>(
        `${process.env.REACT_APP_REST_URL}api/brands/${brand.id}`,
        brand,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.token}`,
          },
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousBrands = queryClient.getQueryData<Brand[]>("brands");
        if (previousBrands) {
          queryClient.setQueryData<Brand[]>(
            "brands",
            previousBrands.map((brand) =>
              brand.id === variables.id ? res.data : brand
            )
          );
        }
      },
    }
  );
  const deleteBrandMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}api/brands/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.token}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousBrands = queryClient.getQueryData<Brand[]>("brands");
        if (previousBrands) {
          queryClient.setQueryData<Brand[]>(
            "brands",
            previousBrands.filter((brand) => brand.id !== variables)
          );
        }
      },
    }
  );
  return {
    createBrandMutation,
    updateBrandMutation,
    deleteBrandMutation,
  };
};
