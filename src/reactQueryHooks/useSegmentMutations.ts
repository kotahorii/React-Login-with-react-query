import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Segment } from "../types/vehicleTypes";

export const useMutateSegments = () => {
  const queryClient = useQueryClient();

  const createSegmentMutation = useMutation(
    (segment: Segment) =>
      axios.post<Segment>(
        `${process.env.REACT_APP_REST_URL}api/segments/`,
        segment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.token}`,
          },
        }
      ),
    {
      onSuccess: (res) => {
        const previousSegments =
          queryClient.getQueryData<Segment[]>("segments");
        if (previousSegments) {
          queryClient.setQueryData<Segment[]>("segments", [
            ...previousSegments,
            res.data,
          ]);
        }
      },
    }
  );
  const updateSegmentMutation = useMutation(
    (segment: Segment) =>
      axios.put<Segment>(
        `${process.env.REACT_APP_REST_URL}api/segments/${segment.id}/`,
        segment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.token}`,
          },
        }
      ),

    {
      onSuccess: (res, variables) => {
        const previousSegments =
          queryClient.getQueryData<Segment[]>("segments");
        if (previousSegments) {
          queryClient.setQueryData<Segment[]>(
            "segments",
            previousSegments.map((seg) =>
              seg.id === variables.id ? res.data : seg
            )
          );
        }
      },
    }
  );
  const deleteSegmentMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}api/segments/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.token}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousSegments =
          queryClient.getQueryData<Segment[]>("segments");
        if (previousSegments) {
          queryClient.setQueryData<Segment[]>(
            "segments",
            previousSegments.filter((seg) => seg.id !== variables)
          );
        }
        console.log("Deleted in segment");
      },
    }
  );
  return {
    createSegmentMutation,
    updateSegmentMutation,
    deleteSegmentMutation,
  };
};
