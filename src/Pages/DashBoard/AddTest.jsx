import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitel from "../../Shared/Serction Titel/SectionTitel";
import { useForm } from "react-hook-form";

const imge_hosting_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imge_hosting_key}`;

const AddTest = () => {
  const { register, handleSubmit, } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      console.log(res.data);

      // Separate slots and dates arrays
      const slots = Object.keys(data).filter((key) => key.startsWith('slot')).map((key) => data[key].trim());
      const dates = Object.keys(data).filter((key) => key.startsWith('date')).map((key) => data[key].trim());

      console.log('Slots:', slots);
      console.log('Dates:', dates);

      const testInfo = {
        testName: data.name,
        testDetails: data.testDetails,
        category: data.category,
        price: parseFloat(data.cost),
        available_Dates: dates,
        slots: slots,
        test_title: data.testTitle,
        image: res.data.data.display_url,
      };

      console.log(testInfo);
      const testRes = await axiosSecure.post('/tests', testInfo);

      if (testRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "A New Test Has been Added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="m-4">
      <SectionTitel Heading="Add a new Test"></SectionTitel>
      {/* name */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text"> Test Name *</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Test Name"
              className="input input-bordered w-full "
            />
          </div>
          {/* details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Test Details</span>
            </label>
            <textarea
              {...register("testDetails", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Test details"
            ></textarea>
          </div>

          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
          {/* title */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text"> Test title *</span>
            </label>
            <input
              type="text"
              {...register("testTitle", { required: true })}
              placeholder="Test Title"
              className="input input-bordered w-full "
            />
          </div>
          {/* category */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text"> category *</span>
            </label>
            <input
              type="text"
              {...register("category", { required: true })}
              placeholder="Category"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full flex-1">
            <label className="label">
              <span className="label-text">Cost *</span>
            </label>
            <input
              type="text"
              {...register("cost", { required: true })}
              placeholder="Cost"
              className="input input-bordered w-full "
            />
          </div>

          {/* time slots */}

          <div className="flex gap-5">
            <div className="flex-1">
            <label className="label">
                <span className="label-text">Slots</span>
              </label>
              {/* Generate dynamic input fields for slots */}
              {Array.from({ length: 3 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  {...register(`slot${index + 1}`, { required: true })}
                  placeholder={`Slot ${index + 1}`}
                  className="input input-bordered w-full"
                />
              ))}
            </div>

            <div className="form-control w-full flex-1">
            <label className="label">
                <span className="label-text">Dates *</span>
              </label>
              {/* Use type="date" for date input */}
              <input
                type="date"
                {...register('date1', { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="date"
                {...register('date2', { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="date"
                {...register('date3', { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <button className="my-4 btn btn-warning bg-amber-400">
            Add a Test{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
