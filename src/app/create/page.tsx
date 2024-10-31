"use client";

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';


const CreateReport: React.FC = () => {
    const [artistEng, setArtistEng] = useState('');
    const [artistKor, setArtistKor] = useState('');
    const [imageAlpha, setImageAlpha] = useState<File | null>(null);
    const [gallery, setGallery] = useState<FileList | null>(null);
    const [background, setBackground] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCreateReport = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageAlphaURL = '';
            let backgroundURL: string | null = null;
            let galleryURLs: string[] | null = null;

            if (imageAlpha) {
                const imageAlphaRef = ref(storage, `reports/${artistEng}/image_alpha/${imageAlpha.name}`);
                await uploadBytes(imageAlphaRef, imageAlpha);
                imageAlphaURL = await getDownloadURL(imageAlphaRef);
            }

            if (background) {
                const backgroundRef = ref(storage, `reports/${artistEng}/background/${background.name}`);
                await uploadBytes(backgroundRef, background);
                backgroundURL = await getDownloadURL(backgroundRef);
            }

            if (gallery) {
                const galleryURLsTemp: string[] = [];
                for (let i = 0; i < gallery.length; i++) {
                    const file = gallery[i];
                    const galleryRef = ref(storage, `reports/${artistEng}/gallery/${file.name}`);
                    await uploadBytes(galleryRef, file);
                    const url = await getDownloadURL(galleryRef);
                    galleryURLsTemp.push(url);
                }
                if (galleryURLsTemp.length > 0) {
                    galleryURLs = galleryURLsTemp;
                }
            }

            await addDoc(collection(db, 'Report'), {
                artist_eng: artistEng,
                artist_kor: artistKor,
                title: `${artistEng} IPO REPORT`,
                sub_title: `${artistKor} IPO 리포트`,
                image_alpha: imageAlphaURL,
                background: backgroundURL,
                gallery: galleryURLs,
              });

            alert('리포트가 성공적으로 생성되었습니다.');

            setArtistEng('');
            setArtistKor('');
            setImageAlpha(null);
            setBackground(null);
            setGallery(null);
        } catch (error) {
            console.error('리포트 생성 중 오류 발생:', error);
            alert('리포트 생성에 실패하였습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">새로운 리포트 생성</h2>
            <form onSubmit={handleCreateReport}>
                {/* artist_eng */}
                <div className="mb-4">
                    <label className="block text-dark text-sm font-bold mb-2" htmlFor="artistEng">
                    아티스트명 (영문)
                    </label>
                    <input
                    id="artistEng"
                    type="text"
                    placeholder="아티스트명을 영문으로 입력하세요"
                    className="input input-bordered w-full"
                    value={artistEng}
                    onChange={(e) => setArtistEng(e.target.value)}
                    required
                    />
                </div>
                {/* artist_kor */}
                <div className="mb-4">
                    <label className="block text-dark text-sm font-bold mb-2" htmlFor="artistKor">
                    아티스트명 (한글)
                    </label>
                    <input
                    id="artistKor"
                    type="text"
                    placeholder="아티스트명을 한글로 입력하세요"
                    className="input input-bordered w-full"
                    value={artistKor}
                    onChange={(e) => setArtistKor(e.target.value)}
                    required
                    />
                </div>
                {/* image_alpha */}
                <div className="mb-4">
                    <label className="block text-dark text-sm font-bold mb-2">
                    대표 이미지
                    </label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageAlpha(e.target.files ? e.target.files[0] : null)}
                    required
                    />
                </div>
                {/* background */}
                <div className="mb-4">
                    <label className="block text-dark text-sm font-bold mb-2">
                    배경 이미지 (선택 사항)
                    </label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBackground(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                {/* gallery */}
                <div className="mb-6">
                    <label className="block text-dark text-sm font-bold mb-2">
                    갤러리 이미지 (선택 사항, 여러 개 선택 가능)
                    </label>
                    <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setGallery(e.target.files)}
                    />
                </div>
                <button
                    type="submit"
                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    {loading ? '생성 중...' : '리포트 생성'}
                </button>
            </form>
        </div>
    );
}

export default CreateReport;