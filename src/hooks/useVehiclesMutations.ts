import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Vehicle } from "../types/vehicleTypes";

export const useMutateVehicles = () => {
  const queryClient = useQueryClient();

  const createVehiclesMutation = useMutation(
    (vehicle: Vehicle) =>
      axios.post<Vehicle>(
        `${process.env.REACT_APP_REST_URL}api/vehicles`,
        vehicle,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.token}`,
          },
        }
      ),
    {
      onSuccess: (res) => {
        const previousVehicle = queryClient.getQueryData<Vehicle[]>("vehicles");
        if (previousVehicle) {
          queryClient.setQueryData<Vehicle[]>("vehicles", [
            ...previousVehicle,
            res.data,
          ]);
        }
      },
    }
  );
  const updateVehicleMutation = useMutation(
    (vehicle: Vehicle) =>
      axios.put<Vehicle>(
        `${process.env.REACT_APP_REST_URL}api/vehicles/${vehicle.id}`,
        vehicle,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.token}`,
          },
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousVehicle = queryClient.getQueryData<Vehicle[]>("vehicles");
        if (previousVehicle) {
          queryClient.setQueryData<Vehicle[]>(
            "vehicles",
            previousVehicle.map((vehicle) =>
              vehicle.id === variables.id ? res.data : vehicle
            )
          );
        }
      },
    }
  );
  const deleteVehicleMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}api/vehicles/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.token}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousVehicle = queryClient.getQueryData<Vehicle[]>("vehicles");
        if (previousVehicle) {
          queryClient.setQueryData<Vehicle[]>(
            "brands",
            previousVehicle.filter((vehicle) => vehicle.id !== variables)
          );
        }
      },
    }
  );

  return {
    createVehiclesMutation,
    updateVehicleMutation,
    deleteVehicleMutation,
  };
};
