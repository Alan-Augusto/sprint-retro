import React, { useState } from 'react';
import { Button } from './ui/button';
import { clearUserData } from '@/lib/utils';

export default function TopIcons({ teamId }: { teamId: string }){
    const [copyLink, setCopyLink] = useState(false);
    
    return (
        <div className='flex justify-between items-center'>
            <Button
                variant="outline"
                onClick={() => {
                    navigator.clipboard.writeText(`https://sprint-retro-theta.vercel.app/${teamId}`);
                    setCopyLink(true);
                    setTimeout(() => setCopyLink(false), 2000);
                }}
                >
                {copyLink ? "Link copiado" : "Gerar link"}
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    clearUserData()
                }}
            >
                Sair
            </Button>
            
        </div>
    );
};