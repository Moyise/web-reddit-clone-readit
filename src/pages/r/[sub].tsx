import { ChangeEvent, createRef, Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import PostCard from "../../components/post-card";
import { Sub } from "../../types";
import { useAuthState } from "../../context/auth";
import classNames from "classnames";
import axios from "axios";
import Sidebar from '../../components/sidebar';

function PageSub() {
  const [ownSub, setOwnSub] = useState(false);

  const { authenticated, user } = useAuthState();

  const router = useRouter();
  const fileInputRef = createRef<HTMLInputElement>();
  const { sub: subName } = router.query;
  const { data: sub, error, revalidate } = useSWR<Sub>(
    subName ? `/subs/${subName}` : null,
  );

  useEffect(() => {
    if (!sub) {
      return;
    }

    setOwnSub(authenticated && user.username === sub.username);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownSub) {
      return;
    }

    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current.name);

    try {
      await axios.post<Sub>(`/subs/${sub.name}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      revalidate();
    } catch (error) {
      console.log({ error });
    }
  };

  if (error) {
    router.push("/");
  }

  let postsMarkup;
  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = (
      <p className="text-lg text-center">No posts submitted yet...</p>
    );
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ));
  }

  return (
    <Fragment>
      <Head>
        <title>{sub?.title}</title>
      </Head>
      {sub && (
        <Fragment>
          <input
            type="file"
            hidden={true}
            ref={fileInputRef}
            onChange={uploadImage}
          />
          <div>
            <div
              className={classNames("bg-blue-500", {
                "cursor-pointer": ownSub,
              })}
              onClick={() => openFileInput("banner")}
            >
              {sub.bannerUrl ? (
                <div
                  className="h-56 bg-blue-500"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ) : (
                <div className="h-20 bg-blue-500" />
              )}
            </div>
            <div className="h-20 bg-white">
              <div className="container relative flex">
                <div className="absolute" style={{ top: -15 }}>
                  <Image
                    src={sub.imageUrl}
                    alt="Sub"
                    title="Sub"
                    className={classNames("rounded-full", {
                      "cursor-pointer": ownSub,
                    })}
                    onClick={() => openFileInput("image")}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    /r/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container flex pt-5">
            <div className="w-160">{postsMarkup}</div>
            <Sidebar sub={sub} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default PageSub;
