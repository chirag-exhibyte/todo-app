import { useColorModeValue } from "@/components/ui/color-mode";
import { PasswordInput } from "@/components/ui/password-input";
import RegiImage from '../../assets/registration.jpg'
import {
  Box,
  Button,
  Container,
  Field,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";

const Registration = () => {
  const {registration} = useAuth();
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      phoneNumber: yup
        .string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Handle registration logic here
      console.log(values);
      setSubmitting(false);
      registration(values);
    },
  });

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Container
        maxW="7xl"
        height={"vh"}
        // border={"2px solid red"}
        py={{ base: 8, md: 12 }}
        px={{ base: 4, sm: 6, lg: 8 }}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 8, lg: 16 }}
          alignItems="center"
        >
          {/* Form Section */}
          <Box
            bg={bgColor}
            p={{ base: 6, md: 8 }}
            rounded="xl"
            shadow="xl"
            w="100%"
            order={{ base: 2, lg: 1 }}
          >
            <Stack spacing={6} mb={8}>
              <Box textAlign="center">
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color={headingColor}
                  mb={2}
                >
                  User Registration
                </Heading>
                <Text color={textColor}>
                  Create your account to get started
                </Text>
              </Box>
            </Stack>

            <Stack spacing={6}>
              {/* Form Fields Grid */}
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                <Field.Root invalid={errors.firstName && touched.firstName}>
                  <Field.Label>First Name</Field.Label>
                  <Input
                    name="firstName"
                    placeholder="John"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.firstName}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={errors.lastName && touched.lastName}>
                  <Field.Label>Last Name</Field.Label>
                  <Input
                    name="lastName"
                    placeholder="Doe"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.lastName}</Field.ErrorText>
                </Field.Root>
              </Grid>

              <Field.Root invalid={errors.email && touched.email}>
                <Field.Label>Email</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  size="lg"
                />
                <Field.ErrorText>{errors.email}</Field.ErrorText>
              </Field.Root>

              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                <Field.Root invalid={errors.password && touched.password}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.password}</Field.ErrorText>
                </Field.Root>

                <Field.Root
                  invalid={errors.confirmPassword && touched.confirmPassword}
                >
                  <Field.Label>Confirm Password</Field.Label>
                  <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
                </Field.Root>
              </Grid>

              <Field.Root invalid={errors.phoneNumber && touched.phoneNumber}>
                <Field.Label>Phone Number</Field.Label>
                <Input
                  name="phoneNumber"
                  placeholder="1234567890"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  size="lg"
                />
                <Field.ErrorText>{errors.phoneNumber}</Field.ErrorText>
              </Field.Root>

              <Stack spacing={4} pt={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  isLoading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Create Account
                </Button>

                <Button as={Link} to="/login" variant="ghost" size="lg">
                  Already have an account? Login
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* Image Section */}
          <Flex
            display={{ base: "none", lg: "flex" }}
            justify="center"
            align="center"
            order={{ base: 1, lg: 2 }}
          >
            <Image
              src={RegiImage}
              alt="Registration illustration"
              // maxW="400px"
              w="100%"
            />
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
};

export default Registration;
