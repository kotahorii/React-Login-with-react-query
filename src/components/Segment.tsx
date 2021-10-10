import { VFC, memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editSegment, selectSegment } from "../features/vehicleSlice";
import { useMutateSegments } from "../reactQueryHooks/useSegmentMutations";
import { useQuerySegments } from "../reactQueryHooks/useSegmentQuery";
import styles from "./Segment.module.css";

export const Segment: VFC = memo(() => {
  const { status, data } = useQuerySegments();
  const editedSegment = useAppSelector(selectSegment);
  const dispatch = useAppDispatch();
  const {
    createSegmentMutation,
    updateSegmentMutation,
    deleteSegmentMutation,
  } = useMutateSegments();

  const submitSegment =
    editedSegment.id === 0
      ? () => {
          createSegmentMutation.mutate({
            segment_name: editedSegment.segment_name,
          });
          dispatch(editSegment({ id: 0, segment_name: "" }));
        }
      : () => {
          updateSegmentMutation.mutate(editedSegment);
          dispatch(editSegment({ id: 0, segment_name: "" }));
        };

  console.log("rendered Segment");

  if (status === "loading") return <div>{"Loading..."}</div>;
  if (status === "error") return <div>{"Error"}</div>;
  return (
    <>
      <h3>Segment</h3>

      <span className={styles.segment__status}>Success</span>
      <div>
        <input
          type="text"
          placeholder="new segment name"
          value={editedSegment.segment_name}
          onChange={async (e) => {
            await dispatch(
              editSegment({ ...editedSegment, segment_name: e.target.value })
            );
          }}
        />
        <button
          data-testid="btn-post"
          disabled={!editedSegment.segment_name}
          onClick={submitSegment}
        >
          {editedSegment.id === 0 ? "Create" : "Update"}
        </button>
        <ul>
          {data?.map((seg) => (
            <li className={styles.segment__item} key={seg.id}>
              <span data-testid={`list-${seg.id}`}>{seg.segment_name}</span>
              <div>
                <button
                  data-testid={`delete-seg-${seg.id}`}
                  onClick={() => deleteSegmentMutation.mutate(seg.id!)}
                >
                  delete
                </button>
                <button
                  data-testid={`edit-seg-${seg.id}`}
                  onClick={() => {
                    dispatch(editSegment(seg));
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
