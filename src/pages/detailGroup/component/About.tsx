import React from "react";
import styled from "styled-components";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar, Button } from "@material-ui/core";
import { Group, User } from "../../../generated/graphql";
import moment from "moment";
import { useHistory } from "react-router";
import { UserContext } from "../../../utils/useAuth";

interface AboutProps {
  about: Group;
  url: string;
}

export const About: React.FC<AboutProps> = ({ about, url }) => {
  const router = useHistory();
  const { user } = React.useContext(UserContext);

  return (
    <Box style={{ backgroundColor: "#f0f2f5" }}>
      <Introduce>
        <Title>
          <TitleInside>
            <h2>Giới thiệu về nhóm này</h2>
          </TitleInside>
        </Title>
        <Box2>
          <Hr />
          <Describe>
            <span>{about?.describe}</span>
          </Describe>

          <Line>
            <div
              style={{
                padding: "8px 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LineInfo>
                <LineInfoWrap>
                  {about?.public ? <PublicIcon /> : <LockIcon />}
                </LineInfoWrap>
                <LineInfoWrap>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "-5px 0",
                    }}
                  >
                    <Topic>
                      <span>{about?.public ? "Công khai" : "Riêng tư"}</span>
                    </Topic>
                    <Content>
                      <span>
                        {about?.public
                          ? "Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng."
                          : "Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng."}
                      </span>
                    </Content>
                  </div>
                </LineInfoWrap>
              </LineInfo>
            </div>
          </Line>
          <Line>
            <div
              style={{
                padding: "8px 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LineInfo>
                <LineInfoWrap>
                  <VisibilityIcon />
                </LineInfoWrap>
                <LineInfoWrap>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "-5px 0",
                    }}
                  >
                    <Topic>
                      <span>Hiển thị</span>
                    </Topic>
                    <Content>
                      <span>Ai cũng có thể tìm nhóm này.</span>
                    </Content>
                  </div>
                </LineInfoWrap>
              </LineInfo>
            </div>
          </Line>
          <Line>
            <div
              style={{
                padding: "8px 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LineInfo>
                <LineInfoWrap>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24px"
                    height="24px"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </LineInfoWrap>
                <LineInfoWrap>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "-5px 0",
                    }}
                  >
                    <Topic>
                      <span>Tổng quát</span>
                    </Topic>
                  </div>
                </LineInfoWrap>
              </LineInfo>
            </div>
          </Line>
          <Line>
            <div
              style={{
                padding: "8px 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LineInfo>
                <LineInfoWrap>
                  <WatchLaterIcon />
                </LineInfoWrap>
                <LineInfoWrap>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "-5px 0",
                    }}
                  >
                    <Topic>
                      <span>Lịch sử</span>
                    </Topic>
                    <Content>
                      <span>
                        Đã tạo nhóm vào {moment(about?.createdAt).format("LL")}
                      </span>
                    </Content>
                  </div>
                </LineInfoWrap>
              </LineInfo>
            </div>
          </Line>
        </Box2>
      </Introduce>
      <Introduce>
        <Title>
          <TitleInside style={{ flexDirection: "row" }}>
            <h2 style={{ paddingRight: "5px" }}>Thành viên</h2>
            <span style={{ margin: "0 2px" }}>•</span>
            <span style={{ padding: "0 5px" }}>{about?.members.length}</span>
          </TitleInside>
        </Title>
        <Box2>
          <Hr />
          <div style={{ marginBottom: "10px" }}>
            <MemberWrap>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <AvatarGroup max={14} style={{ padding: "10px 0" }}>
                  {about?.members.map((member) => (
                    <UserAvatar
                      alt="Remy Sharp"
                      src={member?.profile?.avatar || ""}
                      key={member?.id}
                    />
                  ))}
                </AvatarGroup>
                <div>
                  <Content>
                    <span>
                      {about.members
                        .filter((f) => f?.username !== user.username)
                        .filter((f, index) => index < 3)
                        .map((member, index) => (
                          <>
                            {member?.displayname
                              ?.split(" ")
                              .slice(0, -1)
                              .join(" ")}
                            {about.members.filter(
                              (f) => f?.username !== user.username
                            ).length > 1 &&
                              index < 2 &&
                              ", "}
                          </>
                        ))}
                      {about.members.filter(
                        (f) => f?.username !== user.username
                      ).length > 1 &&
                        ` và ${
                          about.members.filter(
                            (f) => f?.username !== user.username
                          ).length - 3
                        } nguời khác`}{" "}
                      là thành viên
                    </span>
                  </Content>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <AvatarGroup max={14} style={{ padding: "10px 0" }}>
                  {(about?.admins as User[])
                    .concat(about.leader)
                    .map((member) => (
                      <UserAvatar
                        alt="Remy Sharp"
                        src={member?.profile?.avatar || ""}
                        key={member?.id}
                      />
                    ))}
                </AvatarGroup>
                <div>
                  <Content>
                    <span>
                      {about?.leader.displayname} là quản trị viên.
                      {(about?.admins as User[]).length !== 0 &&
                        `${(about?.admins as User[])[0].displayname} và ${
                          (about?.admins as User[]).length - 1
                        } thành viên khác là người kiểm duyệt.`}
                    </span>
                  </Content>
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <ButtonJoin
                  variant="contained"
                  onClick={() => router.push(`${url}`)}
                >
                  Xem tất cả
                </ButtonJoin>
              </div>
            </MemberWrap>
          </div>
        </Box2>
      </Introduce>
    </Box>
  );
};
const UserAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Box2 = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
`;
const Introduce = styled.div`
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 500px;
  margin: 8px;
  position: relative;
`;
const Title = styled.div`
  margin: 4px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;
const TitleInside = styled.div`
  padding: 20px 0 4px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    padding: 0 16px;
    color: #050505;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 1.0625rem;
    line-height: 1.1765;
  }
  span {
    color: #656763;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 1.0625rem;
    line-height: 1.1765;
  }
`;
const Hr = styled.hr`
  background: #dadde1;
  border-width: 0;
  color: #dadde1;
  height: 1px;
  background-color: #ced0d4;
  margin: 12px 16px 0;
`;
const Describe = styled.div`
  padding: 12px 16px;
  font-family: inherit;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 0.9375rem;
    line-height: 1.3333;
  }
`;
const Line = styled.div`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;
const LineInfo = styled.div`
  padding-right: 16px;
  padding-left: 16px;
  display: flex;
  flex-direction: row;
`;
const LineInfoWrap = styled.div`
  margin: -5px 0;
  padding: 6px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  min-width: 0;
`;
const Topic = styled.div`
  margin: 5px 0;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 0.9375rem;
    line-height: 1.3333;
  }
`;
const Content = styled.div`
  margin: 5px 0;
  span {
    color: #050505;
    word-break: break-word;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    text-align: left;
    max-width: 100%;
    word-wrap: break-word;
    display: block;
    font-size: 0.8125rem;
    line-height: 1.2308;
  }
`;
const MemberWrap = styled.div`
  padding-top: 16px;
  padding-right: 12px;
  padding-left: 12px;
`;
const ButtonJoin = styled(Button)`
  width: 100%;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`;
