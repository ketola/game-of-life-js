package com.codereanimator.js.gameoflife.test;

import static org.junit.Assert.*;

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
		baseUrl = "file:///C:/Users/Sauli/git/game-of-life-js/game-of-life-js/game-of-life-js-app/src/main/webapp/index.html";
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

	@After
	public void tearDown() throws Exception {
		driver.quit();
		String verificationErrorString = verificationErrors.toString();
		if (!"".equals(verificationErrorString)) {
			fail(verificationErrorString);
		}
	}
}
