package com.codereanimator.js.gameoflife.test;

import static org.junit.Assert.*;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverBackedSelenium;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.internal.WrapsDriver;

import com.thoughtworks.selenium.Selenium;


public class GameOfLifeAppTest {
	private WebDriver driver;
	private String baseUrl;
	private StringBuffer verificationErrors = new StringBuffer();
	
	@Before
	public void setUp() throws Exception {
		driver = new FirefoxDriver();
		baseUrl = new File(new File(".").getAbsolutePath()).getParentFile().getParentFile().getAbsolutePath() + File.separator + "game-of-life-js-app" + File.separator + "src" + File.separator + "main" + File.separator + "webapp" + File.separator + "index.html";
		driver.navigate().to(baseUrl);
	}

	@Test
	public void testPlayAndStop() throws Exception {
		assertTrue(driver.findElement(By.id("buttonPlay")).isEnabled());
		assertFalse(driver.findElement(By.id("buttonStop")).isEnabled());
		
		driver.findElement(By.id("buttonPlay")).click();
		assertFalse(driver.findElement(By.id("buttonPlay")).isEnabled());
		assertTrue(driver.findElement(By.id("buttonStop")).isEnabled());
		
		driver.findElement(By.id("buttonStop")).click();
		assertTrue(driver.findElement(By.id("buttonPlay")).isEnabled());
		assertFalse(driver.findElement(By.id("buttonStop")).isEnabled());
	}
	
	@Test
	public void testSetGameDimensions() throws Exception {
		assertEquals("30", driver.findElement(By.id("inputSizeX")).getAttribute("value"));
		assertEquals("30", driver.findElement(By.id("inputSizeY")).getAttribute("value"));
		
		driver.findElement(By.id("inputSizeX")).clear();
		driver.findElement(By.id("inputSizeX")).sendKeys("50");
		driver.findElement(By.id("inputSizeY")).clear();
		driver.findElement(By.id("inputSizeY")).sendKeys("60");
		
		driver.findElement(By.id("buttonSetGridSize")).click();
		
		assertEquals("500px", driver.findElement(By.id("drawArea")).getCssValue("width"));
		assertEquals("600px", driver.findElement(By.id("drawArea")).getCssValue("height"));
	}

	@After
	public void tearDown() throws Exception {
		driver.quit();
		String verificationErrorString = verificationErrors.toString();
		if (!"".equals(verificationErrorString)) {
			fail(verificationErrorString);
		}
	}
}
