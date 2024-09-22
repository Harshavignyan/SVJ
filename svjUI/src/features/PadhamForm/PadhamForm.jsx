import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDimensions, setResult } from './padhamSlice';
import { useCalculatePadhamMutation } from '../../services/padhamApi.service';

const validationSchema = Yup.object({
  lengthFeet: Yup.number().required('Required'),
  lengthInches: Yup.number().min(0).max(11).required('Required'),
  widthFeet: Yup.number().required('Required'),
  widthInches: Yup.number().min(0).max(11).required('Required'),
});

const PadhamForm = () => {
  const dispatch = useDispatch();
  const [calculatePadham] = useCalculatePadhamMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    dispatch(setDimensions(values));

    try {
      const response = await calculatePadham(values).unwrap();
      dispatch(setResult(response));

      // Navigate to the result page without resetting the form values
      navigate('/result');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Formik
      initialValues={{ lengthFeet: '', lengthInches: '', widthFeet: '', widthInches: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <Form>
          {/* Length Fields */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Length (Feet)</label>
              <Field name="lengthFeet" type="number" className="form-control" />
              <ErrorMessage name="lengthFeet" component="div" className="text-danger" />
            </div>
            <div className="col">
              <label className="form-label">Length (Inches)</label>
              <Field name="lengthInches" type="number" className="form-control" />
              <ErrorMessage name="lengthInches" component="div" className="text-danger" />
            </div>
          </div>

          {/* Width Fields */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Width (Feet)</label>
              <Field name="widthFeet" type="number" className="form-control" />
              <ErrorMessage name="widthFeet" component="div" className="text-danger" />
            </div>
            <div className="col">
              <label className="form-label">Width (Inches)</label>
              <Field name="widthInches" type="number" className="form-control" />
              <ErrorMessage name="widthInches" component="div" className="text-danger" />
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary mx-2">
              Calculate
            </button>
            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => resetForm()}
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PadhamForm;
