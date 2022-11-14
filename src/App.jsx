import "./styles.css"
import { Formik, Form, Field, FieldArray, getIn } from "formik"

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const Input = ({ children, label, ...props }) => {
  const { type = "text" } = props
  return (
    <div className={`input-container input-container--${type}`}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field {...props}>{children}</Field>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <h1>Schedule an Interview</h1>
      <Formik
        initialValues={{
          candidate: {
            name: "",
            email: "",
            profileUrl: "",
            dateSearchStart: "",
            dateSearchEnd: ""
          },
          slots: []
        }}
        onSubmit={async (values, { resetForm }) => {
          await sleep(2000) // simulated API call
          window.alert(
            "Thank you for your request. Unfortunately, this will require manual intervention"
          )
          resetForm()
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <fieldset>
              <legend>Candidate</legend>
              <Input name="candidate.name" label="Name" />
              <Input name="candidate.email" label="Email" type="email" />
              <Input name="candidate.profileUrl" label="Profile URL" />
              <Input
                name="candidate.dateSearchState"
                label="Date search start"
              />
              <Input name="candidate.dateSearchEnd" label="Date search end" />
            </fieldset>
            <FieldArray name="slots">
              {({ remove }) => {
                return values.slots?.map((slot, index) => (
                  <fieldset key={slot._id}>
                    <legend>Slot #{index + 1}</legend>
                    <Input
                      name={`slots.${index}.type`}
                      label="Type"
                      as="select"
                    >
                      <option value="" disabled={true}>
                        Select
                      </option>
                      <option value="frontEndTechnical">
                        Front-end Technical
                      </option>
                      <option value="backEndTechnical">
                        Back-end Technical
                      </option>
                      <option value="behavioral">Behavioral</option>
                    </Input>
                    <Input
                      name={`slots.${index}.agenda`}
                      label="Agenda"
                      as="select"
                    >
                      <option value="" disabled={true}>
                        Select
                      </option>
                      <option value="codeWalkthrough">Code Walkthrough</option>
                      <option value="codeChallenge">
                        Live Coding Challenge
                      </option>
                      <option value="projectWalkthrough">
                        Take-home Project Discussion
                      </option>
                    </Input>
                    {/* TODO: Duration radiogroup */}
                    <fieldset>
                      <legend>Duration</legend>
                      <Input
                        id={`slots.${index}.duration-15`}
                        name={`slots.${index}.duration`}
                        type="radio"
                        value="15"
                        label="15"
                      />
                      <Input
                        id={`slots.${index}.duration-30`}
                        name={`slots.${index}.duration`}
                        type="radio"
                        value="30"
                        label="30"
                      />
                      <Input
                        id={`slots.${index}.duration-45`}
                        name={`slots.${index}.duration`}
                        type="radio"
                        value="45"
                        label="45"
                      />
                      <Input
                        id={`slots.${index}.duration-60`}
                        name={`slots.${index}.duration`}
                        type="radio"
                        value="60"
                        label="60"
                      />
                      <Input
                        id={`slots.${index}.duration-other`}
                        name={`slots.${index}.duration`}
                        type="radio"
                        value="other"
                        label="Other"
                      />
                      {getIn(values, `slots.${index}.duration`) === "other" && (
                        <Input
                          name={`slots.${index}.otherDuration`}
                          aria-label="Other duration"
                        />
                      )}
                    </fieldset>
                    <Input
                      name="numberOfParticipants"
                      label="Number of Participants"
                    />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </fieldset>
                ))
              }}
            </FieldArray>
            <button
              type="button"
              onClick={() =>
                setFieldValue(
                  "slots",
                  values.slots.concat({
                    _id: crypto.randomUUID(),
                    type: "",
                    agenda: "",
                    duration: "",
                    otherDuration: ""
                  })
                )
              }
            >
              <span aria-hidden="true">+</span> Add interview slot
            </button>
            <button type="submit" disabled={isSubmitting}>
              Schedule
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
