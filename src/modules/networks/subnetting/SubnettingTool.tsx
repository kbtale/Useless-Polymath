import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { CoreSlider } from '../../../components/core/CoreSlider';
import { calculateSubnet } from './logic';
import styles from './Subnetting.module.scss';

export const SubnettingTool: React.FC = () => {
  const { t } = useTranslation('subnetting');
  const [ip, setIp] = useState('192.168.1.10');
  const [cidr, setCidr] = useState(24);

  const result = calculateSubnet(ip, cidr);

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('label_ip')}</label>
            <CoreBaseInput
              value={ip}
              onChangeValue={setIp}
              allowedChars={/^[0-9.]*$/}
              maxLength={15}
              placeholder="192.168.0.1"
            />
          </div>

          <div className={styles.inputGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className={styles.label}>{t('label_cidr')}</label>
              <span className={styles.label}>/{cidr}</span>
            </div>
            <CoreSlider
              min={0}
              max={32}
              value={cidr}
              onChange={setCidr}
            />
          </div>

          {result ? (
            <div className={styles.results}>
              <div className={styles.resultItem}>
                <span className={styles.resLabel}>{t('label_network')}</span>
                <span className={styles.resValue}>{result.network}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resLabel}>{t('label_broadcast')}</span>
                <span className={styles.resValue}>{result.broadcast}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resLabel}>{t('label_mask')}</span>
                <span className={styles.resValue}>{result.mask}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resLabel}>{t('label_hosts')}</span>
                <span className={styles.resValue}>{result.hosts.toLocaleString()}</span>
              </div>
              <div className={styles.resultItem} style={{ gridColumn: 'span 2' }}>
                <span className={styles.resLabel}>{t('label_range')}</span>
                <span className={styles.resValue}>{result.range}</span>
              </div>
            </div>
          ) : (
            <div className={styles.results}>
              <div className={styles.resultItem} style={{ gridColumn: 'span 2', textAlign: 'center', color: '#ff6b6b' }}>
                {t('label_invalid_ip')}
              </div>
            </div>
          )}
        </div>
      </FUIGlassPanel>

      <FUIGlassPanel className={styles.panel}>
        <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};
