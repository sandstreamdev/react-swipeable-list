import React, { useState } from 'react';
import {
  SwipeableList,
  SwipeableListItem
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import ListItem from './ComplexListItem';
import ComplexItemContent from './ComplexItemContent';
import { MailIcon, ReplyIcon, DeleteIcon } from '../images/icons';
import styles from './app.module.css';

function App() {
  const [triggeredSimpleItemAction, triggerSimpleItemAction] = useState('');
  const [triggeredComplexItemAction, triggerComplexItemAction] = useState('');

  const swipeRightDataSimple = name => ({
    content: (
      <div className={styles.contentLeft}>
        <span>Left content</span>
      </div>
    ),
    action: () => triggerSimpleItemAction(`Swipe right action on "${name}"`)
  });

  const swipeLeftDataSimple = name => ({
    content: (
      <div className={styles.contentRight}>
        <span>Right content</span>
      </div>
    ),
    action: () => triggerSimpleItemAction(`Swipe left action on "${name}"`)
  });

  const itemContentSimple = name => (
    <div className={styles.listItem}>
      <span>{name}</span>
    </div>
  );

  const swipeRightDataComplex = name => ({
    content: (
      <ComplexItemContent
        icon={<DeleteIcon />}
        label="Delete"
        side="right"
        color="red"
      />
    ),
    action: () =>
      triggerComplexItemAction(`Delete action triggered on "${name}" item`)
  });

  const swipeLeftDataComplex = name => ({
    content: (
      <ComplexItemContent
        icon={<ReplyIcon />}
        label="Reply"
        color="green"
        side="left"
      />
    ),
    action: () =>
      triggerComplexItemAction(`Reply action triggered on "${name}" item`)
  });

  return (
    <div className={styles.example}>
      <span>
        Suspendisse nunc arcu, pretium id arcu nec, bibendum semper libero.
        Morbi aliquet pellentesque nunc quis dapibus. Proin a facilisis purus,
        quis pellentesque leo. Nullam maximus nulla ac ante lacinia pharetra.
        Cras bibendum ac mauris id laoreet. Maecenas luctus arcu ac sapien
        pharetra convallis. Mauris sed varius sapien, eu fermentum turpis.
      </span>
      <div className={styles.listContainer}>
        <SwipeableList threshold={0.25}>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('First')}
            swipeRight={swipeRightDataComplex('First')}
          >
            <ListItem
              icon={<MailIcon />}
              name="first"
              description="first description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="second"
              description="second description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="third"
              description="third description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="fourth"
              description="fourth description"
            />
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet
        elit ut erat viverra tempor vitae nec velit. Mauris quam leo, efficitur
        ut leo eget, faucibus semper justo. Aenean tellus justo, ornare a justo
        quis, fermentum semper massa. Fusce lacinia nulla ut enim rhoncus
        molestie. Cras dui dui, luctus eget nunc a, blandit efficitur ligula.
        Curabitur lobortis neque ut nulla faucibus fringilla. Nunc commodo
        suscipit vehicula. Sed consectetur mattis pulvinar. Aliquam lacinia,
        ipsum id placerat eleifend, risus nunc accumsan tellus, sit amet viverra
        ante mauris vel purus. Curabitur quis neque id metus convallis sodales.
        Aenean ornare velit eu mauris pretium, ac suscipit ex fermentum. In et
        eros arcu. Vestibulum sollicitudin, erat vel tincidunt bibendum, lorem
        risus hendrerit sem, ut molestie nisl ligula in quam. Nam vehicula
        dignissim mi, id pretium eros mattis eget. Donec a metus dapibus,
        sodales justo sit amet, efficitur risus. Suspendisse aliquam porttitor
        viverra. Suspendisse nunc arcu, pretium id arcu nec, bibendum semper
        libero. Morbi aliquet pellentesque nunc quis dapibus. Proin a facilisis
        purus, quis pellentesque leo. Nullam maximus nulla ac ante lacinia
        pharetra. Cras bibendum ac mauris id laoreet. Maecenas luctus arcu ac
        sapien pharetra convallis. Mauris sed varius sapien, eu fermentum
        turpis. Suspendisse pellentesque placerat tellus, quis convallis augue
        ornare quis. Vestibulum faucibus nibh at augue aliquet faucibus. Duis
        auctor, mauris et aliquet blandit, sem erat rutrum ipsum, et efficitur
        elit justo a arcu. Nunc porta justo non justo tempor, id ultrices risus
        egestas. Maecenas porttitor lectus sollicitudin molestie vehicula.
        Pellentesque gravida enim in purus convallis rutrum. Proin eget
        ullamcorper diam. Etiam mauris nunc, consequat ac quam vitae, vulputate
        laoreet purus. Aenean blandit lobortis erat vitae posuere. Donec nibh
        mauris, blandit id magna ac, scelerisque ullamcorper erat. Nulla
        sollicitudin lectus libero, id mollis mauris porta a. In iaculis non
        enim nec pretium. Vestibulum ultrices aliquam tortor sed hendrerit.
        Integer tortor nibh, faucibus ac aliquet sit amet, sollicitudin ac
        massa. Morbi euismod cursus rhoncus. Quisque ultricies nisl at diam
        fringilla, sit amet facilisis massa ullamcorper. Sed ut turpis lacus.
        Cras consequat in leo quis placerat. Etiam facilisis diam pulvinar augue
        dignissim, sed maximus orci tempus. Integer eget ligula id lorem ornare
        efficitur nec vitae nibh. Pellentesque tincidunt vehicula metus, vitae
        placerat erat tincidunt vel. Morbi nunc augue, laoreet sed lobortis eu,
        faucibus in odio. Sed vestibulum, mi a hendrerit aliquam, sapien nibh
        venenatis urna, et sodales risus urna non metus. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Suspendisse nec urna orci. Aliquam lacus nisi, condimentum eget luctus
        sit amet, mattis id lectus. Aliquam bibendum turpis sed leo luctus, nec
        consectetur mi consectetur. Morbi tempor nisi eu odio finibus dictum.
        Maecenas cursus porttitor nisi et semper. Praesent in posuere metus.
        Phasellus erat nisi, iaculis at bibendum vitae, suscipit eget urna.
        Etiam pretium metus id odio placerat, vitae feugiat eros hendrerit.
        Aenean consectetur vehicula mattis. Suspendisse leo sapien, rhoncus nec
        dictum venenatis, fermentum vitae ligula. Pellentesque maximus blandit
        maximus. Donec dignissim, nisi ac lacinia aliquam, orci odio malesuada
        diam, consectetur vestibulum urna nulla non urna. Donec enim felis,
        condimentum ac blandit sed, varius ac neque. Sed luctus lorem vitae
        lacus dictum, in sodales orci posuere.
      </span>
      <h3>react-swipeable-list example</h3>
      <h5>(try also mobile view in dev tools for touch events)</h5>
      <h3>Simple example (with default 0.5 action trigger threshold)</h3>
      <span className={styles.actionInfo}>{triggeredSimpleItemAction}</span>
      <div className={styles.listContainer}>
        <SwipeableList>
          <SwipeableListItem
            swipeRight={swipeRightDataSimple('Item with swipe right')}
          >
            {itemContentSimple('Item with swipe right')}
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataSimple('Item with swipe left')}
          >
            {itemContentSimple('Item with swipe left')}
          </SwipeableListItem>
          <SwipeableListItem
            swipeRight={swipeRightDataSimple('Item with both swipes')}
            swipeLeft={swipeLeftDataSimple('Item with both swipes')}
          >
            {itemContentSimple('Item with both swipes')}
          </SwipeableListItem>
          <SwipeableListItem>
            {itemContentSimple('Item without swipe actions')}
          </SwipeableListItem>
        </SwipeableList>
      </div>
      <h3>
        More complex items and scroll (with 0.25 action trigger threshold)
      </h3>
      <span className={styles.actionInfo}>{triggeredComplexItemAction}</span>
      <div className={styles.complexListContainer}>
        <SwipeableList threshold={0.25}>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('First')}
            swipeRight={swipeRightDataComplex('First')}
          >
            <ListItem
              icon={<MailIcon />}
              name="first"
              description="first description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="second"
              description="second description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="third"
              description="third description"
            />
          </SwipeableListItem>
          <SwipeableListItem
            swipeLeft={swipeLeftDataComplex('Second')}
            swipeRight={swipeRightDataComplex('Second')}
          >
            <ListItem
              icon={<MailIcon />}
              name="fourth"
              description="fourth description"
            />
          </SwipeableListItem>
        </SwipeableList>
      </div>
    </div>
  );
}

export default App;
