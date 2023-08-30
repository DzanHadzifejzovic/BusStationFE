import React from 'react'
import {StyledHomePage,Title,Button,StyledSection,SectionContent,Image,Text,Divider,Animation} from '../components/HomeSection/HomeSection.styles'
import { animateScroll as scroll } from 'react-scroll';

const Home = () => {

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <>
    <StyledHomePage>
      <Title>Dobrodošli na stranicu autobuske stanice</Title>
      <Animation src="bus-animated.png" alt="Image 2" />
      <Divider street />
    </StyledHomePage>

    
      <StyledSection>
        <SectionContent>
          <Image src="https://images.adsttc.com/media/images/5d9f/b94b/284d/d140/5200/00ba/slideshow/cepezed_bus_station_Tilburg_lucas_van_der_wee_05.jpg?1570748723" alt="Image 1" />
          <Text>Dosadilo ti je da čekaš red vožnje,da autobus kasni i da sediš na autobuskoj ?</Text>
        </SectionContent>
      </StyledSection>
      <Divider />

      <StyledSection>
        <SectionContent> 
          <Text>Naša autobuska stanica donosi promene. Uvodi redove vožnje koji su dostupni stalno na veb stranici,i ono što je najbitnije isti se redovno ažuriraju</Text>
          <Image src="https://images.adsttc.com/media/images/5d9f/b92b/284d/d107/7900/0137/slideshow/cepezed_bus_station_Tilburg_lucas_van_der_wee_04.jpg?1570748688" alt="Image 2" />
        </SectionContent>
      </StyledSection>
      <Divider />

      <StyledSection>
        <SectionContent reverse>
          <Text>Provjeri naše redove vožnje 
            <Button onClick={scrollToTop} to='/bus-lines'>Redovi voznje</Button>
          </Text>
          <Image src="https://images.adsttc.com/media/images/5d9f/b8e6/284d/d140/5200/00b9/slideshow/cepezed_bus_station_Tilburg_lucas_van_der_wee_02.jpg?1570748622" alt="Image 3" />
        </SectionContent>
      </StyledSection>
      <Divider />
      
      <StyledSection>
        <SectionContent>
          <Text>Veliki broj perona koji olaksava veci promet autobusa</Text>
          <Image src="https://images.adsttc.com/media/images/5d9f/ba02/284d/d107/7900/013b/slideshow/cepezed_bus_station_Tilburg_lucas_van_der_wee_11.jpg?1570748909" alt="Image 3" />
        </SectionContent>
      </StyledSection>
      <Divider />

      <StyledSection>
        <SectionContent reverse>
          <Text>Najsavremeniji autobusi u kojima vise nema neudobnih sedista,u kojima put i ne osetite 
            <Button onClick={scrollToTop} to='/buses'>Naši autobusi</Button>
           </Text>
          <Image src="https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2016/01/15152703/Dubrovnik-Bus-Station-870x400.jpg" alt="Image 3" />
        </SectionContent>
      </StyledSection>
      <Divider />
    
    </>
  )
}

export default Home