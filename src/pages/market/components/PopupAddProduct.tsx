import { Avatar, Button, IconButton, LinearProgress } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";
import { Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { SelectFormField } from "../../../components/SelectFormField";
import { TextFormField } from "../../../components/TextFormField";
import {
  MeProductsDocument,
  ProductsDocument,
  useCreateProductMutation,
} from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/toErrorMap";
import { UserContext } from "../../../utils/useAuth";

interface PopupAddProductProps {
  fc: () => void;
  data: any;
}

export const PopupAddProduct: React.FC<PopupAddProductProps> = ({
  fc,
  data,
}) => {
  const [createProduct] = useCreateProductMutation();
  const { user } = useContext(UserContext);
  const inputImage: any = useRef(null);
  const [arrImage, setArrImage] = useState<string[]>([]);
  const [loadingCreate, setLoadingCreate] = React.useState(false);

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      Array.from(e.target.files).map((file) => readerImage(file));
    }
  };

  const readerImage = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setArrImage((previewImage) =>
        previewImage.concat(e.target?.result as string)
      );
    };
    reader.readAsDataURL(file);
  };

  const [errorImage, setErrorImage] = useState<any>({});

  const removeItem = (image: string) => {
    const filtered = arrImage.filter((x: any) => x !== image);
    setArrImage(filtered);
  };

  return (
    <Container>
      <Overlay />
      <div className="follow-main">
        {loadingCreate && <LinearProgress />}
        <Formik
          initialValues={{
            body: "",
            price: "",
            describe: "",
            category: "",
            address: "",
            image: [""],
          }}
          onSubmit={async (values, { setErrors }) => {
            setLoadingCreate(true);

            values.image = arrImage;
            const response: any = await createProduct({
              variables: values,
              refetchQueries: [
                { query: ProductsDocument },
                { query: MeProductsDocument },
              ],
            });
            if (
              response.data?.createProduct.error.length &&
              response.data?.createProduct.error
            ) {
              setLoadingCreate(false);
              setErrors(toErrorMap(response.data?.createProduct.error));
              setErrorImage(
                response.data.createProduct.error.find(
                  (e: any) => e.field === "image"
                )
              );
            } else {
              fc();
              setLoadingCreate(false);
            }
          }}
        >
          {() => (
            <Form autoComplete="off">
              <div className="follow-modal">
                <Wrapper>
                  <div
                    className="follow-modal-top"
                    style={{ borderBottom: "0px" }}
                  >
                    <div className="follow-modal-top-icon">
                      <IconButton
                        aria-label="close-icon"
                        color="primary"
                        onClick={fc}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="follow-modal-top-text">
                      <h2 className="title">New Message</h2>
                    </div>
                    <div className="follow-modal-top-icon">
                      {loadingCreate ? (
                        <ButtonDisable
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          type="submit"
                        >
                          Tạo bài niêm yết
                        </ButtonDisable>
                      ) : (
                        <Button
                          aria-label="close-icon"
                          color="primary"
                          className="btn-save"
                          type="submit"
                        >
                          Tạo bài niêm yết
                        </Button>
                      )}
                    </div>
                  </div>
                </Wrapper>
                <Padding>
                  <div className="follow-modal-bottom">
                    <div className="profile__wrapper">
                      <div className="profile__wrapper">
                        <div className="follow-modal-bottom-itemWrap">
                          <div className="follow-modal-bottom-item">
                            <div className="item">
                              <div className="item-left">
                                <div className="avatar">
                                  <Avatar src={user.profile.avatar || ""} />
                                </div>
                              </div>
                              <div className="item-right">
                                <div className="item-right-top">
                                  <div className="item-right-top-text">
                                    <div className="name-wrap">
                                      <div className="name">
                                        <span>{user.displayname}</span>
                                      </div>
                                      <div className="username">
                                        <span>Niêm yết trên Marketplace</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Note>
                          Ảnh
                          <span style={{ margin: "0px 4px" }}>
                            <span>&nbsp;</span>
                            <span>.</span>
                          </span>
                          {`${arrImage.length} / 10`}
                          <span
                            style={{ fontWeight: "normal", marginLeft: "4px" }}
                          >
                            - Bạn có thể thêm tối đa 10 ảnh
                          </span>
                        </Note>
                        {errorImage.field && !arrImage.length ? (
                          <ErrorText>{errorImage.message}</ErrorText>
                        ) : null}
                        {arrImage.length ? (
                          <ListImageSelected>
                            {arrImage.map((m: string, i: number) => (
                              <ImageSelected key={i} style={{ width: "104px" }}>
                                <Image>
                                  <ImageP>
                                    <ImageM src={m} />
                                  </ImageP>
                                  <ImageC>
                                    <CloseIcon onClick={() => removeItem(m)} />
                                  </ImageC>
                                </Image>
                              </ImageSelected>
                            ))}

                            {arrImage.length < 10 && (
                              <ImageSelected style={{ width: "104px" }}>
                                <Center>
                                  <Button
                                    color="default"
                                    aria-label="add product photo"
                                    startIcon={<AddAPhotoIcon />}
                                    onClick={() => inputImage.current.click()}
                                  >
                                    Thêm ảnh
                                  </Button>
                                  <input
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    multiple
                                    type="file"
                                    className="input-file"
                                    ref={inputImage}
                                    onChange={handleImageChange}
                                  />
                                </Center>
                              </ImageSelected>
                            )}
                          </ListImageSelected>
                        ) : (
                          <ProductImage
                            className={`${
                              errorImage.field ? "errorImage" : ""
                            } `}
                          >
                            <Div>
                              <Button
                                variant="contained"
                                color="default"
                                aria-label="add product photo"
                                startIcon={<AddAPhotoIcon />}
                                onClick={() => inputImage.current.click()}
                              >
                                Thêm ảnh
                              </Button>
                              <input
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                multiple
                                name="image"
                                type="file"
                                className="input-file"
                                ref={inputImage}
                                onChange={handleImageChange}
                              />
                            </Div>
                          </ProductImage>
                        )}

                        <Field
                          label="Tiêu đề"
                          name="body"
                          component={TextFormField}
                        />
                        <Field
                          label="Giá"
                          name="price"
                          component={TextFormField}
                        />
                        <Field
                          options={data.getCategories}
                          categories
                          name="category"
                          label="Hạng mục"
                          component={SelectFormField}
                        />
                        <Field
                          options={data.getLocations}
                          name="address"
                          label="Địa điểm"
                          component={SelectFormField}
                        />
                        <Field
                          label="Mô tả"
                          name="describe"
                          multiline
                          rows={8}
                          component={TextFormField}
                        />
                      </div>
                    </div>
                  </div>
                </Padding>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  background-color: #000;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;
const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;
const Div = styled.div``;
const WrapText = styled.div`
  margin-bottom: 8px;
  margin-top: 16px;
`;
const Padding = styled.div`
  padding: 0 12px;
`;

const ProductImage = styled.div`
  position: relative;
  margin: 12px 0px;
  height: 160px;
  border-radius: 4px;
  border: 1px solid #ced0d4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListImageSelected = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
`;

const ImageSelected = styled.div`
  position: relative;
  margin: 4px;
`;

const Image = styled.div`
  border-radius: 4px;
  position: relative;
`;
const ImageM = styled.img`
  position: absolute;
  border-radius: 4px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageP = styled.div`
  padding-bottom: 100%;
  width: 100%;
  position: relative;
`;

const ImageC = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #e4e6eb;
  height: 100%;
`;
const Note = styled.span`
  color: #65676b;
  font-weight: 600;
  line-height: 12px;
  word-break: break-word;
  font-size: 12px;
  margin-top: 12px;
`;
const ErrorText = styled.div`
  color: #f44336;
  margin-left: 14px;
  margin-right: 14px;
  margin-top: 3px;
  font-size: 0.75rem;
  margin-top: 3px;
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
`;
const ButtonDisable = styled(Button)`
  opacity: 0.7;
`;
