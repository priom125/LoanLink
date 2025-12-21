import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import useAxios from "../hooks/useAxios";


const UserAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (action === "suspend" && (!reason || !feedback)) return;

    setLoading(true);

    const payload =
      action === "approve"
        ? { roleStatus: "Approved" }
        : {
            roleStatus: "Suspended",
            suspendInfo: { reason, feedback },
          };

    await axiosInstance.patch(`update-roleStatus/${id}`, payload);
    navigate("/dashboard/manage-users");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">Review User</h1>
        <p className="text-sm text-gray-500">
          Approve or suspend this user account
        </p>
      </div>

      {/* User Summary */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="font-semibold text-lg">User Information</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><span className="font-medium">User ID:</span> {id}</p>
            <p><span className="font-medium">Current Status:</span> Pending</p>
          </div>
        </div>
      </div>

      {/* Action Selection */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="font-semibold text-lg mb-2">Select Action</h2>

          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="action"
                className="radio radio-success"
                onChange={() => setAction("approve")}
              />
              <div>
                <p className="font-medium text-success">Approve User</p>
                <p className="text-sm text-gray-500">
                  Grant access to the platform
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="action"
                className="radio radio-error"
                onChange={() => setAction("suspend")}
              />
              <div>
                <p className="font-medium text-error">Suspend User</p>
                <p className="text-sm text-gray-500">
                  Block user access with reason
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Suspend Details */}
      {action === "suspend" && (
        <div className="card bg-error/5 border border-error shadow">
          <div className="card-body">
            <h2 className="font-semibold text-error mb-2">
              Suspension Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="label font-medium">
                  Suspend Reason
                </label>
                <select
                  className="select select-bordered w-full"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option value="">Select reason</option>
                  <option value="Fraud activity">Fraud activity</option>
                  <option value="Policy violation">Policy violation</option>
                  <option value="Fake documents">Fake documents</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="label font-medium">
                  Admin Feedback
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Explain why this account is being suspended"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline"
        >
          Cancel
        </button>

        <button
          disabled={!action || loading}
          onClick={handleSubmit}
          className={`btn ${
            action === "approve"
              ? "btn-success"
              : "btn-error"
          }`}
        >
          {action === "approve" ? "Approve User" : "Suspend User"}
        </button>
      </div>
    </div>
  );
};

export default UserAction;
