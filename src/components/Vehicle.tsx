import { VFC, ChangeEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  editVehicle,
  resetVehicle,
  selectVehicles,
} from "../features/vehicleSlice";
import { useQueryBrands } from "../reactQueryHooks/useBrandQuery";
import { useQuerySegments } from "../reactQueryHooks/useSegmentQuery";
import { useMutateVehicles } from "../reactQueryHooks/useVehiclesMutations";
import { useQueryVehicles } from "../reactQueryHooks/useVehiclesQuery";
import styles from "./Vehicle.module.css";

export const Vehicle: VFC = memo(() => {
  const dispatch = useAppDispatch();
  const editedVehicle = useAppSelector(selectVehicles);
  const { data: dataBrands, status: statusBrands } = useQueryBrands();
  const { data: dataSegments, status: statusSegments } = useQuerySegments();
  const { data, status } = useQueryVehicles();
  const {
    createVehiclesMutation,
    updateVehicleMutation,
    deleteVehicleMutation,
  } = useMutateVehicles();

  const submitVehicle =
    editedVehicle.id === 0
      ? () => {
          createVehiclesMutation.mutate(editedVehicle);
          dispatch(resetVehicle());
        }
      : () => {
          updateVehicleMutation.mutate(editedVehicle);
          dispatch(resetVehicle());
        };

  console.log("rendered Vehicle");

  const segmentOptions = dataSegments?.map((seg) => (
    <option key={seg.id} value={seg.id}>
      {seg.segment_name}
    </option>
  ));
  const brandOptions = dataBrands?.map((brand) => (
    <option key={brand.id} value={brand.id}>
      {brand.brand_name}
    </option>
  ));

  if (statusBrands === "loading" && statusSegments === "loading")
    <div>{"Loading..."}</div>;
  if (statusBrands === "error" && statusSegments === "error")
    return <div>{"Error"}</div>;

  return (
    <>
      <h3>Vehicle</h3>
      <div className={styles.vehicle__input}>
        <input
          type="text"
          placeholder="new vehicle name"
          value={editedVehicle.vehicle_name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(
              editVehicle({ ...editedVehicle, vehicle_name: e.target.value })
            )
          }
        />
        <input
          type="number"
          placeholder="year of release"
          min="0"
          value={editedVehicle.release_year}
          onChange={(e) => {
            dispatch(
              editVehicle({ ...editedVehicle, release_year: e.target.value })
            );
          }}
        />
        <input
          type="number"
          placeholder="price"
          min="0"
          step="0.01"
          value={editedVehicle.price}
          onChange={(e) => {
            dispatch(editVehicle({ ...editedVehicle, price: e.target.value }));
          }}
        />
      </div>
      <select
        data-testid="select-segment"
        value={editedVehicle.segment}
        onChange={(e) => {
          dispatch(editVehicle({ ...editedVehicle, segment: e.target.value }));
        }}
      >
        <option value="{0}">Segment</option>
        {segmentOptions}
      </select>
      <select
        data-testid="selec-brand"
        value={editedVehicle.brand}
        onChange={(e) =>
          dispatch(editVehicle({ ...editedVehicle, brand: e.target.value }))
        }
      >
        <option value="{0}">Brand</option>
        {brandOptions}
      </select>
      <button
        data-testid="btn-vehicle-post"
        disabled={
          !editedVehicle.vehicle_name ||
          !editedVehicle.brand ||
          !editedVehicle.segment
        }
        onClick={submitVehicle}
      >
        {editedVehicle.id === 0 ? "Create" : "Update"}
      </button>
      <ul>
        {data?.map((vehicle) => (
          <li className={styles.vehivle__item} key={vehicle.id}>
            <span data-testid={`list-${vehicle.id}`}>
              <strong data-testid={`name-${vehicle.id}`}>
                {vehicle.vehicle_name}
              </strong>
              --{vehicle.release_year}--- ￥{vehicle.price}[M] ---
              {vehicle.segment_name} {vehicle.brand_name}
            </span>
            <div>
              <button
                data-testid={`delete-veh-${vehicle.id}`}
                onClick={() => deleteVehicleMutation.mutate(vehicle.id!)}
              >
                delete
              </button>
              <button
                data-testid={`edit-veh-${vehicle.id}`}
                onClick={() => dispatch(editVehicle(vehicle))}
              >
                edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
});
